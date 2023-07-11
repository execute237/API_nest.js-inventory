import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		return this.prisma.category.findMany();
	}

	async findOne(id: number) {
		return this.prisma.category.findUnique({ where: { id } });
	}
}
