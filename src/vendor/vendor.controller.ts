import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorDto } from './dto/vendor.dto';

@Controller('vendor')
export class VendorController {
	constructor(private readonly vendorService: VendorService) {}

	@Post('create')
	async create(@Body() vendorDto: VendorDto) {
		return this.vendorService.create(vendorDto);
	}

	@Get('all')
	async findAll() {
		return this.vendorService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return this.vendorService.findOne(id);
	}

	@Patch(':id')
	async update(@Param('id', ParseIntPipe) id: number, @Body() vendorDto: VendorDto) {
		return this.vendorService.update(id, vendorDto);
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.vendorService.remove(id);
	}
}
