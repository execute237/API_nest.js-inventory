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
	ForbiddenException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryDto } from './dto/inventory.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../common/decorators/has-roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { DecodedPayload } from '../auth/auth.types';
import { INVENTORY_ERROR } from './inventory.constants';

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
		@User() user: DecodedPayload,
	) {
		if (user.role === Role.EMPLOYEE && updateQuantityDto.number > 0) {
			throw new ForbiddenException(INVENTORY_ERROR.EMPLOYEE_POSITIVE_NUMBER_FORBIDDEN);
		}
		return this.inventoryService.updateQuantity(id, updateQuantityDto.number);
	}

	@HasRoles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.inventoryService.remove(id);
	}
}
