import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDTO } from "./user.dto";

import { User } from "./user.entity";
import { UserMapper } from "./user.mapper";

@Injectable()
export class UserService {

	public constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
		private userMapper: UserMapper
	) { }

	public async getAllUsers(): Promise<UserDTO[]> {
		const users: User[] = await this.userRepo.find();
		return this.userMapper.toDTOs(users);
	}

	public async getUserById(id: number): Promise<UserDTO> {
		const user: User = await this.userRepo.findOne({ where: { id: id} });
		return this.userMapper.toDTO(user);
	}
}