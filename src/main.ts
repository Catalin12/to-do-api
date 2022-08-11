import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config: ConfigService = app.get(ConfigService);
	await app.listen(3000);
}
bootstrap();
