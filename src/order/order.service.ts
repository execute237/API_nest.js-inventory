import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class OrderService {
	constructor(private readonly prisma: PrismaService) {}

	create(orderDto: OrderDto) {
		return this.prisma.order.create({ data: { ...orderDto } });
	}

	findAll() {
		return this.prisma.order.findMany();
	}

	findOne(id: number) {
		return this.prisma.order.findUnique({ where: { id } });
	}

	update(id: number, orderDto: OrderDto) {
		return this.prisma.order.update({
			where: { id },
			data: { ...orderDto, updatedAt: new Date().toLocaleDateString('ru-RU') },
		});
	}
}
