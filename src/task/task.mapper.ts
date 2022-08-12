import { Injectable } from "@nestjs/common";
import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskMapper {
	public toDTO(entity: Task): TaskDTO {
		const { id, title, description, isDeleted, isCompleted } = entity;
		const task: TaskDTO = { id, title, description, isDeleted, isCompleted };
		return task;
	}

	public toEntity(dto: TaskDTO): Task {
		const { id, title, description, isDeleted, isCompleted } = dto;
		const task: Task = { id, title, description, isDeleted, isCompleted };
		return task;
	}
}