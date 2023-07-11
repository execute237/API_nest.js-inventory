import { PaymentStatus, ShippingStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNumber } from 'class-validator';

export class OrderDto {
	@IsDate()
	orderDate: Date;

	@IsDate()
	shippingDate: Date;

	@IsEnum(PaymentStatus)
	paymentStatus: PaymentStatus;

	@IsEnum(ShippingStatus)
	shippingStatus: ShippingStatus;

	@IsNumber()
	employeeId: number;

	@IsNumber()
	vendorId: number;
}
