export interface TaskDTO {
	id: number;
	title: string;
	description: string;
	isDeleted: boolean;
	isCompleted: boolean;
	userId: number;
}