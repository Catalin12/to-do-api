import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../user/user.entity";
import { RegisterDTO } from "./register.dto";
import { LoginDTO } from "./login.dto";
import { AuthHelper } from "./auth.helper";

@Injectable()
export class AuthService {

	public constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@Inject(AuthHelper)
		private authHelper: AuthHelper
	) {}

	public async register(registerDTO: RegisterDTO): Promise<User | never> {
		const { name, email, password }: RegisterDTO = registerDTO;
		let user: User = await this.userRepository.findOne({ where: { email } });
		if (user) {
		  throw new HttpException("Conflict", HttpStatus.CONFLICT);
		}
		user = new User();
		user.name = name;
		user.email = email;
		user.password = this.authHelper.encodePassword(password);
		return this.userRepository.save(user);
	}

	public async login(loginDTO: LoginDTO): Promise<string | never> {
		const { email, password }: LoginDTO = loginDTO;
		const user: User = await this.userRepository.findOne({ where: { email } });
		if (!user) {
			throw new HttpException("No user found", HttpStatus.NOT_FOUND);
		}
		const isPasswordValid: boolean = this.authHelper.isPasswordValid(password, user.password);
		if (!isPasswordValid) {
			throw new HttpException("Wrong password", HttpStatus.NOT_FOUND);
		}
		this.userRepository.update(user.id, { lastLoginAt: new Date() });
		return this.authHelper.generateToken(user);
	}
}