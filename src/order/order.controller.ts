import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	create(@Body() orderDto: OrderDto) {
		return this.orderService.create(orderDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('all')
	findAll() {
		return this.orderService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.orderService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() orderDto: OrderDto) {
		return this.orderService.update(id, orderDto);
	}
}
