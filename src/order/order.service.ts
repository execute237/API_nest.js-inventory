import { OrderDto } from './dto/order.dto';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';
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
		return this.prisma.order.update({
			where: { id },
			data: { paymentStatus, shippingStatus },
		});
	}

	async orderProven(id: number) {
		return this.prisma.order.update({ where: { id }, data: { proven: true } });
	}
}
