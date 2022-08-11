import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskService {

	public constructor(
		@InjectRepository(Task)
		private taskRepo: Repository<Task>
	) { }

	public insertTask(taskDTO: TaskDTO): void {
		this.taskRepo.insert(taskDTO);
	}

	public async getAllTasks(): Promise<Task[]> {
		return this.taskRepo.find();
	}

	public async getTaskById(id: number): Promise<Task> {
		return this.taskRepo.findOne({ where: { id: id } });
	}

	public async updateTaskById(taskDTO: TaskDTO): Promise<TaskDTO> {
		await this.taskRepo.update(taskDTO.id, taskDTO);
		return this.taskRepo.findOne({ where: { id: taskDTO.id } });
	}

	public deleteTaskById(id: number): Promise<TaskDTO> {
		this.taskRepo.createQueryBuilder()
			.update(Task)
			.set({ isDeleted: true })
			.where("id = :id", { id: id })
			.execute();
		return this.taskRepo.findOne({ where: { id: id } });
	}

	public async updateCompleteTaskById(id: number, status: boolean): Promise<TaskDTO> {
		this.taskRepo.createQueryBuilder()
			.update(Task)
			.set({ isCompleted: status })
			.where("id = :id", { id: id })
			.execute();
		return this.taskRepo.findOne({ where: { id: id } });
	}
}