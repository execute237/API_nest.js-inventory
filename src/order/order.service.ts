import { OrderDto } from './dto/order.dto';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
	constructor(private readonly prisma: PrismaService) {}

	async create(orderDto: OrderDto) {
		return this.prisma.order.create({ data: { ...orderDto } });
	}

	async findAll() {
		return this.prisma.order.findMany();
	}

	async findOne(id: number) {
		return this.prisma.order.findUnique({ where: { id } });
	}

	async update(id: number, orderDto: Partial<OrderDto>) {
		return this.prisma.order.update({
			where: { id },
			data: { ...orderDto },
		});
	}

	async orderProven(id: number) {
		return this.prisma.order.update({ where: { id }, data: { proven: true } });
	}
}
