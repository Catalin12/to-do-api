import { Injectable } from "@nestjs/common";

import { Task } from "src/task/task.entity";
import { UserDTO } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserMapper {

	public toDTO(entity: User): UserDTO {
		return {
			id: entity.id,
			email: entity.email,
			password: entity.password,
			name: entity.name,
			lastLoginAt: entity.lastLoginAt,
			tasks: entity.tasks?.map(task => task.id)
		};
	}

	public toDTOs(entities: User[]): UserDTO[] {
		const userDTOs: UserDTO[] = [];
		for (const entity of entities) {
			userDTOs.push(this.toDTO(entity))
		}
		return userDTOs;
	}

	public toEntity(dto: UserDTO): User {
		//TODO GET TASKS
		const tasks: Task[] = []
		return {
			id: dto.id,
			email: dto.email,
			password: dto.password,
			name: dto.name,
			lastLoginAt: dto.lastLoginAt,
			tasks: tasks
		};
	}
}