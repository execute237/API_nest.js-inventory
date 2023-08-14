import { PaymentStatus, ShippingStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class EmployeeUpdateOrderDto {
	@IsEnum(PaymentStatus)
	paymentStatus: PaymentStatus;

	@IsEnum(ShippingStatus)
	shippingStatus: ShippingStatus;
}
