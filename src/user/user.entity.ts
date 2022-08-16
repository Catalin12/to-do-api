import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Task } from "src/task/task.entity";

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	public id!: number;

  	@Column({ type: "varchar", default: "" })
	public email: string;

  	@Exclude()
  	@Column({ type: "varchar", default: "" })
  	public password: string;

  	@Column({ type: "varchar", nullable: true })
  	public name: string | null;

  	@Column({ type: "timestamp", nullable: true, default: null })
  	public lastLoginAt: Date | null;

	@OneToMany(() => Task, (task) => task.user)
  	public tasks: Task[];
}