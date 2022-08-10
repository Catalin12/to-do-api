import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "127.0.0.1",
			port: 5432,
			username: "postgres",
			password: "",
			database: "to-do-db",
			synchronize: true,
			entities: ["src/**/*.entity{.ts,.js}"],
			migrations: ["./src/migrations/*.ts"],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
