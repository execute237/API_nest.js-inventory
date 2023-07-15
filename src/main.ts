import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });
	const config = app.get(ConfigService);
	const pinoLogger = app.get(Logger);

	app.useLogger(pinoLogger);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(config.get('SERVE_LISTENER_PORT'));
}
bootstrap();
