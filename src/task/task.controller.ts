import { Body, Controller, Get, Post, Param, Patch, UseGuards } from "@nestjs/common";
import { InsertResult } from "typeorm";

import { TaskDTO } from "./task.dto";
import { TaskService } from "./task.service";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";

@Controller("task")
@UseGuards(JwtAuthGuard)
export class TaskController {

	public constructor(
		private taskService: TaskService
	) { }

	@Post()
	public addTask(@Body() taskDTO: TaskDTO, @CurrentUser() userId: string): Promise<InsertResult> {
		return this.taskService.addTask(taskDTO, userId);
	}

	@Get()
	public getAllTasks(@CurrentUser() userId: string): Promise<TaskDTO[]> {
		return this.taskService.getAllTasksByUserId(userId);
	}

	@Get(":id")
	public getTaskById(@Param("id") id: number, @CurrentUser() userId: string): Promise<TaskDTO> {
		return this.taskService.getTaskById(Number(id), userId);
	}

	@Patch("/update")
	public updateTaskById(@Body() taskDTO: TaskDTO, @CurrentUser() userId: string): Promise<TaskDTO> {
		return this.taskService.updateTaskById(taskDTO, userId);
	}

	@Patch("delete/:id")
	public deleteTaskById(@Param("id") id: number, @CurrentUser() userId: string): Promise<TaskDTO> {
		return this.taskService.deleteTaskById(Number(id), userId);
	}

	@Patch("status/:id")
	public updateCompleteTaskById(@Param("id") id: number, @CurrentUser() userId: string): Promise<TaskDTO> {
		return this.taskService.updateCompleteTaskById(id, userId);
	}
}
