import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class VendorDto {
	@IsString()
	name: string;

	@IsString()
	address: string;

	@IsPhoneNumber('RU')
	phone: string;

	@IsEmail()
	email: string;

	@IsNumber()
	categoryId: number;
}
