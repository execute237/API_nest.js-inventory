import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async findAll() {}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {}
}
