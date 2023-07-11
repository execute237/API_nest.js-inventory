import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@UseGuards(JwtAuthGuard)
	@Get('all')
	async findAll() {
		return this.categoryService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return this.categoryService.findOne(id);
	}
}
