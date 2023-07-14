import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../common/decorators/has-roles.decorator';
import { Role } from '@prisma/client';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

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
		return this.orderService.orderProven(id);
	}
}
