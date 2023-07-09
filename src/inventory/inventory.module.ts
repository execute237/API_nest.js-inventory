import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../common/configs/jwt.config';

@Module({
	imports: [
		AuthModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	controllers: [InventoryController],
	providers: [InventoryService, AuthService],
})
export class InventoryModule {}
