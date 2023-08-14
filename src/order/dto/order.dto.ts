import { PaymentStatus, ShippingStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class OrderDto {
	@IsDate()
	@IsOptional()
	orderDate: Date;

	@IsEnum(PaymentStatus)
	paymentStatus: PaymentStatus;

	@IsEnum(ShippingStatus)
	shippingStatus: ShippingStatus;

	@IsNumber()
	employeeId: number;

	@IsNumber()
	vendorId: number;

	@IsNumber()
	inventoryId: number;

	@IsPositive()
	quantity: number;
}
