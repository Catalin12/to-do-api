import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "src/user/user.module";
import { TaskController } from "./task.controller";
import { Task } from "./task.entity";
import { TaskMapper } from "./task.mapper";
import { TaskService } from "./task.service";

@Module({
	imports: [TypeOrmModule.forFeature([Task]),
		UserModule,
	],
	controllers: [TaskController],
	providers: [TaskService, TaskMapper]
})
export class TaskModule { }