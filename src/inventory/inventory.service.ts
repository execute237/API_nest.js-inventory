import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InventoryDto } from './dto/inventory.dto';
import { PrismaService } from '../database/prisma.service';
import { INVENTORY_ERROR } from './inventory.constants';

@Injectable()
export class InventoryService {
	constructor(private readonly prisma: PrismaService) {}

	async create({ name, measure, quantity, description, categoryId, vendorId }: InventoryDto) {
		return this.prisma.inventory.create({
			data: { name, measure, quantity, description, categoryId, vendorId },
		});
	}

	async findAll() {
		return this.prisma.inventory.findMany();
	}

	async findOne(id: number) {
		const inventory = await this.prisma.inventory.findUnique({ where: { id } });
		if (!inventory) throw new NotFoundException(INVENTORY_ERROR.NOT_FOUND);

		return inventory;
	}

	async update(
		id: number,
		{ name, measure, quantity, description, categoryId, vendorId }: InventoryDto,
	) {
		return this.prisma.inventory.update({
			where: { id },
			data: { name, measure, quantity, description, categoryId, vendorId },
		});
	}

	async updateQuantity(id: number, number: number) {
		const inventory = await this.findOne(id);
		const quantity = inventory.quantity + number;
		if (quantity < 0) throw new BadRequestException(INVENTORY_ERROR.QUANTITY_CANNOT_BE_NEGATIVE);

		const updatedInventory = await this.prisma.inventory.update({
			where: { id: inventory.id },
			data: { quantity },
		});
		return updatedInventory;
	}

	async remove(id: number) {
		const deletedInventory = await this.prisma.inventory.delete({ where: { id } });
		if (!deletedInventory) throw new NotFoundException(INVENTORY_ERROR.NOT_FOUND);

		return deletedInventory;
	}
}
