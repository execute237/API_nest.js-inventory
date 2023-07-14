import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { PrismaService } from '../database/prisma.service';
import { ShippingStatus } from '@prisma/client';
import { ORDER_ALREADY_PROVEN, ORDER_NOT_DELIVERED } from './order.constants';
import { InventoryService } from '../inventory/inventory.service';
import { quantityUpdateEnum } from '../inventory/inventory.types';

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly inventoryService: InventoryService,
	) {}

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
		const order = await this.findOne(id);
		if (order.proven) {
			throw new BadRequestException(ORDER_ALREADY_PROVEN);
		}
		if (order.shippingStatus !== ShippingStatus.DELIVERED) {
			throw new NotAcceptableException(ORDER_NOT_DELIVERED);
		}

		const quantityOperation = {
			operation: quantityUpdateEnum.PLUS,
			number: order.quantity,
		};
		const inventory = await this.inventoryService.updateQuantity(
			order.inventoryId,
			quantityOperation,
		);
		if (!inventory) {
			throw new BadRequestException();
		}
		return this.prisma.order.update({ where: { id }, data: { proven: true } });
	}
}
