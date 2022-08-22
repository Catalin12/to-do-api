import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const config: ConfigService = app.get(ConfigService);
	app.enableCors();
	await app.listen(3000);
}
bootstrap();
