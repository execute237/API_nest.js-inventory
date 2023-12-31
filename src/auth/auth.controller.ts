import { Body, Controller, HttpCode, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() dto: RegisterAuthDto) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...user } = await this.authService.createUser(
			dto.email,
			dto.name,
			dto.password,
		);
		return user;
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: LoginAuthDto) {
		const user = await this.authService.validateUser(dto.email, dto.password);
		return this.authService.login(user.name, user.email, user.id, user.role);
	}

	@Get('refresh')
	async refreshTokens(@Body('refreshToken') refreshToken: string) {
		return this.authService.refreshTokens(refreshToken);
	}
}
