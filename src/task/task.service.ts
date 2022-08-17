import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";

import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";
import { TaskMapper } from "./task.mapper";
import { UserDTO } from "src/user/user.dto";
import { User } from "src/user/user.entity";
import { UserMapper } from "src/user/user.mapper";
import { UserService } from "src/user/user.service";

@Injectable()
export class TaskService {

	public constructor(
		@InjectRepository(Task)
		private taskRepo: Repository<Task>,
		private taskMapper: TaskMapper,
		private userService: UserService,
		private userMapper: UserMapper
	) { }

	public async addTask(taskDTO: TaskDTO): Promise<InsertResult> {
		const task: Task = await this.taskMapper.toEntity(taskDTO);
		return this.taskRepo.insert(task);
	}

	public async getAllTasks(): Promise<TaskDTO[]> {
		const tasks: Task[] = await this.taskRepo.find({
			relations: ["user"]
		});
		return this.taskMapper.toDTOs(tasks);
	}

	public async getAllTasksByUserId(userId): Promise<TaskDTO[]> {
		const userDto: UserDTO = await this.userService.getUserById(userId);
		const user: User = await this.userMapper.toEntity(userDto);
		const tasks: Task[] = await this.taskRepo.find({
			where: {user: user},
			relations: ["user"]
		});
		return this.taskMapper.toDTOs(tasks);
	}

	public async getTaskById(id: number): Promise<TaskDTO> {
		//if you have the same names of properties, you can get rid of one of them for eg: { id: id } will be { id }
		//return this.taskRepo.findOne({ where: { id: id } });
		const task: Task = await this.taskRepo.findOne({
			where: { id: id },
			relations: ["user"]
		});
		return this.taskMapper.toDTO(task);
	}

	public async updateTaskById(taskDTO: TaskDTO): Promise<TaskDTO> {
		const task: Task = await this.taskMapper.toEntity(taskDTO);
		await this.taskRepo.update(taskDTO.id, task);
		const taskUpdated: Task = await this.taskRepo.findOne({ where: { id: taskDTO.id } });
		return this.taskMapper.toDTO(taskUpdated);
	}

	public async deleteTaskById(id: number): Promise<TaskDTO> {
		await this.taskRepo.createQueryBuilder()
			.update(Task)
			.set({ isDeleted: true })
			.where("id = :id", { id: id })
			.execute();
		const task: Task = await this.taskRepo.findOne({ where: { id: id } });
		return this.taskMapper.toDTO(task);
	}

	public async updateCompleteTaskById(id: number, status: boolean): Promise<TaskDTO> {
		await this.taskRepo.createQueryBuilder()
			.update(Task)
			.set({ isCompleted: status })
			.where("id = :id", { id: id })
			.execute();
		const task: Task = await this.taskRepo.findOne({ where: { id: id } });
		return this.taskMapper.toDTO(task);
	}
}