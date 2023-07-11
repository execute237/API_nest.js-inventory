import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { InventoryModule } from './inventory/inventory.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		VendorModule,
		OrderModule,
		DatabaseModule,
		InventoryModule,
		CategoryModule,
	],
})
export class AppModule {}
