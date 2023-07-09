import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class RegisterAuthDto {
	@IsEmail()
	email: string;

	@IsString()
	name: string;

	@IsString()
	password: string;

	@IsEnum(Role)
	role?: Role;
}
