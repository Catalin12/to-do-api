import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskModule } from "./task/task.module";
import { Task } from "./task/task.entity";

@Module({
	imports: [
		TaskModule,
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "127.0.0.1",
			port: 5432,
			username: "postgres",
			password: "admin",
			database: "to-do-db",
			synchronize: true,
			entities: [Task],
			migrations: ["./src/migrations/*.ts"],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
