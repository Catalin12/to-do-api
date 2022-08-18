import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";

import { UserDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

	public constructor(
		private userService: UserService
	) { }

	@Get("current")
	@UseGuards(JwtAuthGuard)
	public async getCurrentUserId(@CurrentUser() id: string): Promise<string> {
	  return id;
	}

	@Get()
	public getAllUsers(): Promise<UserDTO[]> {
		return this.userService.getAllUsers();
	}

	@Get(":id")
	public getTaskById(@Param("id") id: number): Promise<UserDTO> {
		return this.userService.getUserById(Number(id));
	}
}
