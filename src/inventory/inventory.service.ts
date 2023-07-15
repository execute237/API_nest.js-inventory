import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InventoryDto } from './dto/inventory.dto';
import { PrismaService } from '../database/prisma.service';
import { INVENTORY_NOT_FOUND, QUANTITY_CANNOT_BE_NEGATIVE } from './inventory.constants';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class InventoryService {
	constructor(
		private readonly prisma: PrismaService,
		@InjectPinoLogger(InventoryService.name)
		private readonly logger: PinoLogger,
	) {}

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

	async updateQuantity(id: number, number: number) {
		const inventory = await this.findOne(id);
		let quantity = inventory.quantity;
		quantity += number;
		if (quantity < 0) {
			throw new BadRequestException(QUANTITY_CANNOT_BE_NEGATIVE);
		}

		const updatedInventory = await this.prisma.inventory.update({
			where: { id: inventory.id },
			data: { quantity: quantity },
		});

		this.logger.info(
			'Quantity in inventory with id ' +
				inventory.id +
				' changed from ' +
				inventory.quantity +
				' items to ' +
				quantity,
		);
		return updatedInventory;
	}

	async remove(id: number) {
		const deletedInventory = await this.prisma.inventory.delete({ where: { id } });
		if (!deletedInventory) {
			throw new NotFoundException(INVENTORY_NOT_FOUND);
		}
		return deletedInventory;
	}
}
