import {Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";

import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./login.dto";
import { RegisterDTO } from "./register.dto";

@Controller("auth")
export class AuthController {

	public constructor(
		private authService: AuthService
	) { }

	@Post("register")
  	@UseInterceptors(ClassSerializerInterceptor)
	private register(@Body() body: RegisterDTO): Promise<User|never> {
		return this.authService.register(body);
	}

  	@Post("login")
	private login(@Body() body: LoginDTO): Promise<string|never> {
		return this.authService.login(body);
	}
}
