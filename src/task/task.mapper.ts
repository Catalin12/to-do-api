import { Injectable } from "@nestjs/common";
import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskMapper {
	public toDTO(entity: Task): TaskDTO {
		return {
			id: entity.id,
			title: entity.title,
			description: entity.description,
			isDeleted: entity.isDeleted,
			isCompleted: entity.isCompleted
		};
	}

	public toDTOs(entities: Task[]): TaskDTO[] {
		const tasks: TaskDTO[] = [];
		for (const entity of entities) {
			tasks.push(this.toDTO(entity))
		}
		return tasks;
	}

	public toEntity(dto: TaskDTO): Task {
		return {
			id: dto.id,
			title: dto.title,
			description: dto.description,
			isDeleted: dto.isDeleted,
			isCompleted: dto.isCompleted
		};
	}
}