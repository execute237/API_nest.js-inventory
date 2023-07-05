import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import { OrderModule } from './order/order.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		InventoryModule,
		AuthModule,
		VendorModule,
		OrderModule,
	],
})
export class AppModule {}
