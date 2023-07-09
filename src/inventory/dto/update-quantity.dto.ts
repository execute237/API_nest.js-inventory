import { IsEnum, IsNumber } from 'class-validator';
import { quantityUpdateEnum } from '../inventory.types';

export class UpdateQuantityDto {
	@IsEnum(quantityUpdateEnum)
	operation: quantityUpdateEnum;

	@IsNumber()
	number: number;
}
