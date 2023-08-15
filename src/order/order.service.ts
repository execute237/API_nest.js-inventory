import { OrderDto } from './dto/order.dto';
import { PrismaService } from '../database/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EmployeeUpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
	constructor(private readonly prisma: PrismaService) {}

	async create(orderDto: OrderDto) {
		return this.prisma.order.create({ data: orderDto });
	}

	async findAll() {
		return this.prisma.order.findMany();
	}

	async findOne(id: number) {
		return this.prisma.order.findUnique({ where: { id } });
	}

	async updateForEmployee(id: number, { paymentStatus, shippingStatus }: EmployeeUpdateOrderDto) {
		if (!paymentStatus && !shippingStatus) throw new BadRequestException();

		return this.prisma.order.update({
			where: { id },
			data: { paymentStatus, shippingStatus },
		});
	}

	async orderProven(id: number, inventoryId: number, quantity: number) {
		const transaction = await this.prisma.$transaction([
			this.prisma.inventory.update({
				where: { id: inventoryId },
				data: { quantity: { increment: quantity } },
			}),
			this.prisma.order.update({ where: { id }, data: { proven: true } }),
		]);
		return transaction[1];
	}
}
