import { Injectable } from '@nestjs/common';
import { VendorDto } from './dto/vendor.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class VendorService {
	constructor(private readonly prisma: PrismaService) {}

	async create(vendorDto: VendorDto) {
		return this.prisma.vendor.create({ data: { ...vendorDto } });
	}

	async findAll() {
		return this.prisma.vendor.findMany();
	}

	async findOne(id: number) {
		return this.prisma.vendor.findUnique({ where: { id } });
	}

	async update(id: number, vendorDto: VendorDto) {
		return this.prisma.vendor.update({ where: { id }, data: { ...vendorDto } });
	}

	async remove(id: number) {
		return this.prisma.vendor.delete({ where: { id } });
	}
}
