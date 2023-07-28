import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	ParseIntPipe,
	UseGuards,
	BadRequestException,
	NotAcceptableException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../common/decorators/has-roles.decorator';
import { Role, ShippingStatus } from '@prisma/client';
import { InventoryService } from '../inventory/inventory.service';
import { ORDER_ALREADY_PROVEN, ORDER_NOT_DELIVERED } from './order.constants';

@Controller('order')
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly inventoryService: InventoryService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() orderDto: OrderDto) {
		return this.orderService.create(orderDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('all')
	async findAll() {
		return this.orderService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return this.orderService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() orderDto: Partial<OrderDto>) {
		return this.orderService.update(id, orderDto);
	}

	@HasRoles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch('proven/:id')
	async proven(@Param('id', ParseIntPipe) id: number) {
		const order = await this.orderService.findOne(id);
		if (order.proven) {
			throw new BadRequestException(ORDER_ALREADY_PROVEN);
		}
		if (order.shippingStatus !== ShippingStatus.DELIVERED) {
			throw new NotAcceptableException(ORDER_NOT_DELIVERED);
		}

		await this.inventoryService.updateQuantity(order.inventoryId, order.quantity);
		return this.orderService.orderProven(order.id);
	}
}
