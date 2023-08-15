import { PaymentStatus, ShippingStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class EmployeeUpdateOrderDto {
	@IsEnum(PaymentStatus)
	@IsOptional()
	paymentStatus: PaymentStatus;

	@IsEnum(ShippingStatus)
	@IsOptional()
	shippingStatus: ShippingStatus;
}
