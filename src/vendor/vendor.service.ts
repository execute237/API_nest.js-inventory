import { Injectable, NotFoundException } from '@nestjs/common';
import { VendorDto } from './dto/vendor.dto';
import { PrismaService } from '../database/prisma.service';
import { VENDOR_ERROR } from './vendor.constants';

@Injectable()
export class VendorService {
	constructor(private readonly prisma: PrismaService) {}

	async create(vendorDto: VendorDto) {
		return this.prisma.vendor.create({ data: vendorDto });
	}

	async findAll() {
		return this.prisma.vendor.findMany();
	}

	async findOne(id: number) {
		const vendor = this.prisma.vendor.findUnique({ where: { id } });
		if (!vendor) throw new NotFoundException(VENDOR_ERROR.NOT_FOUND);

		return vendor;
	}

	async update(id: number, { name, address, phone, email, categoryId }: VendorDto) {
		return this.prisma.vendor.update({
			where: { id },
			data: { name, address, phone, email, categoryId },
		});
	}

	async remove(id: number) {
		const deletedVendor = await this.prisma.vendor.delete({ where: { id } });
		if (!deletedVendor) throw new NotFoundException(VENDOR_ERROR.NOT_FOUND);

		return deletedVendor;
	}
}
