import {Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";

import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
import { RegisterDto } from "./register.dto";

@Controller("auth")
export class AuthController {

	public constructor(
		private authService: AuthService
	) { }

	@Post("register")
  	@UseInterceptors(ClassSerializerInterceptor)
	private register(@Body() body: RegisterDto): Promise<User|never> {
		return this.authService.register(body);
	}

  	@Post("login")
	private login(@Body() body: LoginDto): Promise<string|never> {
		return this.authService.login(body);
	}
}
