import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TaskModule } from "./task/task.module";
import { Task } from "./task/task.entity";
import { UserModule } from "./user/user.module";
import { User } from "./user/user.entity";

@Module({
	imports: [
		TaskModule,
		UserModule,
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "127.0.0.1",
			port: 5432,
			username: "postgres",
			password: "postgres",
			database: "to-do-db",
			synchronize: true,
			entities: [Task, User],
			migrations: ["./src/migrations/*.ts"],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
