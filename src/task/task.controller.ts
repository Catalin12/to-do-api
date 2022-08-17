import { Body, Controller, Get, Post, Param, Patch, UseGuards, Req } from "@nestjs/common";
import { InsertResult } from "typeorm";

import { TaskDTO } from "./task.dto";
import { TaskService } from "./task.service";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";

@Controller("task")
export class TaskController {

	public constructor(
		private taskService: TaskService
	) { }

	@Post()
	public addTask(@Body() taskDTO: TaskDTO): Promise<InsertResult> {
		return this.taskService.addTask(taskDTO);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	public getAllTasks(@CurrentUser() id: string): Promise<TaskDTO[]> {
		return this.taskService.getAllTasksByUserId(id);
	}

	@Get(":id")
	public getTaskById(@Param("id") id: number): Promise<TaskDTO> {
		return this.taskService.getTaskById(Number(id));
	}

	@Patch("/update")
	public updateTaskById(@Body() taskDTO: TaskDTO): Promise<TaskDTO> {
		return this.taskService.updateTaskById(taskDTO);
	}

	@Patch(":id")
	public deleteTaskById(@Param("id") id: number): Promise<TaskDTO> {
		return this.taskService.deleteTaskById(Number(id));
	}
}
