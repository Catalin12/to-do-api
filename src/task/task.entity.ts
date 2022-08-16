import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/user/user.entity";

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

	@ManyToOne(() => User, (user) => user.tasks)
	public user: User;
}