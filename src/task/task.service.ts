import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";

import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";
import { TaskMapper } from "./task.mapper";

@Injectable()
export class TaskService {

	public constructor(
		@InjectRepository(Task)
		private taskRepo: Repository<Task>,
		private taskMapper: TaskMapper
	) { }

	public addTask(taskDTO: TaskDTO): Promise<InsertResult> {
		return this.taskRepo.insert(taskDTO);
	}

	public async getAllTasks(): Promise<TaskDTO[]> {
		const tasks: Task[] = await this.taskRepo.find();
		return this.taskMapper.toDTOs(tasks);
	}

	public async getTaskById(id: number): Promise<TaskDTO> {
		//if you have the same names of properties, you can get rid of one of them for eg: { id: id } will be { id }
		//return this.taskRepo.findOne({ where: { id: id } });
		const task: Task = await this.taskRepo.findOne({ where: { id: id } });
		return this.taskMapper.toDTO(task);
	}

	public async updateTaskById(taskDTO: TaskDTO): Promise<TaskDTO> {
		await this.taskRepo.update(taskDTO.id, taskDTO);
		const task: Task = await this.taskRepo.findOne({ where: { id: taskDTO.id } });
		return this.taskMapper.toDTO(task);
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