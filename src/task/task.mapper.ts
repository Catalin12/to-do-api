import { Injectable } from "@nestjs/common";

import { UserDTO } from "src/user/user.dto";
import { UserMapper } from "src/user/user.mapper";
import { UserService } from "src/user/user.service";
import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskMapper {

	public constructor(
		private userService: UserService,
		private userMapper: UserMapper
	) {}

	public toDTO(entity: Task): TaskDTO {
		return {
			id: entity.id,
			title: entity.title,
			description: entity.description,
			isDeleted: entity.isDeleted,
			isCompleted: entity.isCompleted,
			userId: entity.user?.id
		};
	}

	public toDTOs(entities: Task[]): TaskDTO[] {
		const taskDTOs: TaskDTO[] = [];
		for (const entity of entities) {
			taskDTOs.push(this.toDTO(entity))
		}
		return taskDTOs;
	}

	public async toEntity(dto: TaskDTO): Promise<Task> {
		const userDto: UserDTO =  await this.userService.getUserById(dto.userId);
		return {
			id: dto.id,
			title: dto.title,
			description: dto.description,
			isDeleted: dto.isDeleted,
			isCompleted: dto.isCompleted,
			user: this.userMapper.toEntity(userDto)
		};
	}
}