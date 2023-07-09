import { Measure } from '@prisma/client';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export class InventoryDto {
	@IsString()
	name: string;

	@IsEnum(Measure)
	measure: Measure;

	@IsPositive()
	quantity: number;

	@IsString()
	description: string;

	@IsNumber()
	categoryId: number;

	@IsNumber()
	vendorId: number;
}
