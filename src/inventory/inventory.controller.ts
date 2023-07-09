import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryDto } from './dto/inventory.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../common/decorators/has-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('inventory')
export class InventoryController {
	constructor(private readonly inventoryService: InventoryService) {}

	@HasRoles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('create')
	async create(@Body() createInventoryDto: InventoryDto) {
		return this.inventoryService.create(createInventoryDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('all')
	async findAll() {
		return this.inventoryService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return this.inventoryService.findOne(id);
	}

	@HasRoles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() updateInventoryDto: InventoryDto) {
		return this.inventoryService.update(id, updateInventoryDto);
	}

	@UseGuards(JwtAuthGuard)
	@Patch('quantity/:id')
	async updateQuantity(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateQuantityDto: UpdateQuantityDto,
	) {
		return this.inventoryService.updateQuantity(id, updateQuantityDto);
	}

	@HasRoles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.inventoryService.remove(+id);
	}
}
