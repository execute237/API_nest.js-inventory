import { IsEmail, IsString } from 'class-validator';

export class RegisterAuthDto {
	@IsEmail()
	email: string;

	@IsString()
	name: string;

	@IsString()
	password: string;
}
