import { Controller, Get, Param } from "@nestjs/common";

import { UserDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

	public constructor(
		private userService: UserService
	) { }

	@Get()
	public getAllUsers(): Promise<UserDTO[]> {
		return this.userService.getAllUsers();
	}

	@Get(":id")
	public getTaskById(@Param("id") id: number): Promise<UserDTO> {
		return this.userService.getUserById(Number(id));
	}
}
