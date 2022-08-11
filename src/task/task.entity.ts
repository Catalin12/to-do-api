import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public title: string;

	@Column()
	public description: string;

	@Column()
	public isDeleted: boolean;

	@Column()
	public isCompleted: boolean;
}