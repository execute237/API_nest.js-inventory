import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { compare, genSalt, hash } from 'bcryptjs';
import { AuthPayload, DecodedPayload } from './auth.types';
import { Role } from '@prisma/client';
import { AUTH_ERROR } from './auth.constants';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

	async findUser(email: string) {
		return this.prisma.employee.findUnique({ where: { email } });
	}

	async createUser(email: string, name: string, password: string) {
		const userExist = await this.findUser(email);
		if (userExist) throw new ConflictException(AUTH_ERROR.ALREADY_REGISTERED);

		const salt = await genSalt(10);
		const newUser = await this.prisma.employee.create({
			data: {
				email,
				name,
				password: await hash(password, salt),
			},
		});

		return newUser;
	}

	async validateUser(email: string, password: string) {
		const user = await this.findUser(email);
		if (!user) throw new NotFoundException(AUTH_ERROR.USER_NOT_FOUND);

		const correctPassword = await compare(password, user.password);
		if (!correctPassword) throw new UnauthorizedException(AUTH_ERROR.WRONG_PASSWORD);

		return user;
	}

	async login(name: string, email: string, id: number, role: Role) {
		const payload = { name, email, role };
		const tokens = await this.generateTokens(payload);
		await this.saveToken(tokens.refreshToken, id);

		return tokens;
	}

	async generateTokens(payload: AuthPayload) {
		const tokens = await Promise.all([
			this.jwtService.signAsync(payload, { expiresIn: '30d' }),
			this.jwtService.signAsync(payload, { expiresIn: '15m' }),
		]);

		return { refreshToken: tokens[0], accessToken: tokens[1] };
	}

	async refreshTokens(refreshToken: string) {
		const tokenExist = await this.prisma.token.findFirst({ where: { refreshToken } });
		if (!tokenExist) throw new BadRequestException(AUTH_ERROR.WRONG_REFRESH_TOKEN);

		const decode = this.jwtService.decode(tokenExist.refreshToken) as DecodedPayload;
		const payload = {
			name: decode.name,
			email: decode.email,
			role: decode.role,
		};
		const tokens = await this.generateTokens(payload);
		await this.saveToken(tokens.refreshToken, tokenExist.id);

		return tokens;
	}

	async saveToken(refreshToken: string, employeeId: number) {
		return this.prisma.token.upsert({
			create: { employeeId, refreshToken },
			update: { refreshToken },
			where: { employeeId },
		});
	}
}
