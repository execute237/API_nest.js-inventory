import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { compare, genSalt, hash } from 'bcryptjs';
import {
	ALREADY_REGISTERED_ERROR,
	ROLE_REGISTER_ERROR,
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
	WRONG_REFRESH_TOKEN_ERROR,
} from './auth.constants';
import { AuthPayload, DecodedPayload } from './auth.types';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService, private prisma: PrismaService) {}

	async findUser(email: string) {
		return this.prisma.employee.findUnique({ where: { email } });
	}

	async createUser(email: string, name: string, password: string, role?: Role) {
		const userExist = await this.findUser(email);
		if (userExist) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		if (role == undefined || role == 'EMPLOYEE') {
			const salt = await genSalt(10);
			return this.prisma.employee.create({
				data: {
					email,
					name,
					password: await hash(password, salt),
				},
			});
		}

		throw new BadRequestException(ROLE_REGISTER_ERROR);
	}

	async validateUser(email: string, password: string) {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const correctPassword = await compare(password, user.password);
		if (!correctPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return user;
	}

	async login(name: string, email: string, id: number, role: Role) {
		const payload = { name, email, role };
		const tokens = await this.generateTokens(payload);
		await this.saveToken(tokens.refreshToken, id);

		return tokens;
	}

	async generateTokens(payload: AuthPayload) {
		const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '30d' });
		const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

		return { refreshToken, accessToken };
	}

	async refreshTokens(refreshToken: string) {
		const tokenExist = await this.prisma.token.findFirst({ where: { refreshToken } });
		if (!tokenExist) {
			throw new BadRequestException(WRONG_REFRESH_TOKEN_ERROR);
		}

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
