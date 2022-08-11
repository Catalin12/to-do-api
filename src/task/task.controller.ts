import { Body, Controller, Get, Post, Param, Patch } from "@nestjs/common";

import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {

	public constructor(
		private taskService: TaskService
	) { }

	@Post()
	public addTask(@Body() taskDTO: TaskDTO): void {
		this.taskService.insertTask(taskDTO);
	}

	@Get()
	public getAllTasks(): Promise<Task[]> {
		return this.taskService.getAllTasks();
	}

	@Get(":id")
	public getTaskById(@Param("id") id: number): Promise<Task> {
		return this.taskService.getTaskById(Number(id));
	}

	@Patch("/update")
	public updateTaskById(
		@Body() taskDTO: TaskDTO): Promise<Task> {
		return this.taskService.updateTaskById(taskDTO);
	}

	@Patch(":id")
	public deleteTaskById(@Param("id") id: number): Promise<Task> {
		return this.taskService.deleteTaskById(Number(id));
	}
}
