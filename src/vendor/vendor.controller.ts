import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorDto } from './dto/vendor.dto';
import { HasRoles } from '../common/decorators/has-roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('vendor')
export class VendorController {
	constructor(private readonly vendorService: VendorService) {}

	@HasRoles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('create')
	async create(@Body() vendorDto: VendorDto) {
		return this.vendorService.create(vendorDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('all')
	async findAll() {
		return this.vendorService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return this.vendorService.findOne(id);
	}

	@HasRoles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() vendorDto: VendorDto) {
		return this.vendorService.update(id, vendorDto);
	}

	@HasRoles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.vendorService.remove(id);
	}
}
