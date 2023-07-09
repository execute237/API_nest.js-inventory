import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryDto } from './dto/inventory.dto';
import { PrismaService } from '../database/prisma.service';
import { INVENTORY_NOT_FOUND } from './inventory.constants';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { quantityUpdateEnum } from './inventory.types';

@Injectable()
export class InventoryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createInventoryDto: InventoryDto) {
		return this.prisma.inventory.create({ data: { ...createInventoryDto } });
	}

	async findAll() {
		return this.prisma.inventory.findMany();
	}

	async findOne(id: number) {
		const inventory = await this.prisma.inventory.findUnique({ where: { id } });
		if (!inventory) {
			throw new NotFoundException(INVENTORY_NOT_FOUND);
		}
		return inventory;
	}

	async update(id: number, updateInventoryDto: InventoryDto) {
		return this.prisma.inventory.update({
			where: { id },
			data: { ...updateInventoryDto },
		});
	}

	async updateQuantity(id: number, updateQuantityDto: UpdateQuantityDto) {
		const inventory = await this.findOne(id);
		if (updateQuantityDto.operation === quantityUpdateEnum.MINUS) {
			inventory.quantity - updateQuantityDto.number;
		} else {
			inventory.quantity + updateQuantityDto.number;
		}

		return this.prisma.inventory.update({
			where: { id: inventory.id },
			data: { quantity: inventory.quantity },
		});
	}

	async remove(id: number) {
		const deletedInventory = await this.prisma.inventory.delete({ where: { id } });
		if (!deletedInventory) {
			throw new NotFoundException(INVENTORY_NOT_FOUND);
		}
		return deletedInventory;
	}
}
