import { IsNumber, ValidateIf } from 'class-validator';

export class UpdateQuantityDto {
	@ValidateIf((value) => value !== 0)
	@IsNumber()
	number: number;
}
