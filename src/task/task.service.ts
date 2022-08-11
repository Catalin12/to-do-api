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

	public async prepareAllTasks(): Promise<Task[]> {
		return this.taskRepo.find();
	}

	public async prepareTaskById(id: number): Promise<Task | undefined> {
		return this.taskRepo.findOne({ where: { id: id } });
	}

	public async updateTaskById(taskDTO: TaskDTO): Promise<TaskDTO> {
		await this.taskRepo.update(taskDTO.id, taskDTO);
		return this.taskRepo.findOne({ where: { id: taskDTO.id } });
	}

	public deleteTaskById(taskId: number): void {
		this.taskRepo.createQueryBuilder().update(Task).set({ isDeleted: true }).where("id = :id", { id: taskId });
	}

	public updateCompleteTaskById(taskId: number, status: boolean): void {
		this.taskRepo.createQueryBuilder().update(Task).set({ isCompleted: status }).where("id = :id", { id: taskId });
	}
}