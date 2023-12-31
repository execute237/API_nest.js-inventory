import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const categories: Prisma.CategoryCreateManyInput[] = [
	{ name: 'electronics', id: 1 },
	{ name: 'furniture', id: 2 },
	{ name: 'office supplies', id: 3 },
	{ name: 'tools', id: 4 },
	{ name: 'appliances', id: 5 },
	{ name: 'beauty products', id: 6 },
	{ name: 'sports equipment', id: 7 },
	{ name: 'medical supplies', id: 8 },
	{ name: 'kitchenware', id: 9 },
	{ name: 'toys', id: 10 },
];

const adminUsers: Prisma.EmployeeCreateManyInput[] = [
	{
		email: 'admin@gmail.com',
		name: 'admin',
		password: '$2y$10$P0EgZ8IS6XvTKaLfvGBqmOtE6bebwbTxxdcnJrS/AwdiukV1YwHW.',
		role: 'ADMIN',
	},
];

async function main() {
	await prisma.$connect();
	for (const category of categories) {
		await prisma.category.upsert({
			where: { id: category.id },
			create: category,
			update: category,
		});
	}
	console.log('Добавлено ' + categories.length + ' категорий');

	for (const admin of adminUsers) {
		await prisma.employee.create({
			data: {
				...admin,
			},
		});
	}
	console.log('Добавлено ' + adminUsers.length + ' админов');

	await prisma.$disconnect();
}

main();
