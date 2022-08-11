import { Injectable, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

import { User } from "src/user/user.entity";

@Injectable()
export class AuthHelper {

	public constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private jwt: JwtService
	) { }

	public async decode(token: string): Promise<unknown> {
  		return this.jwt.decode(token, null);
	}

	public async validateUser(decoded: any): Promise<User> {
  		return this.userRepository.findOne(decoded.id);
	}

	public generateToken(user: User): string {
  		return this.jwt.sign({ id: user.id, email: user.email });
	}

	public isPasswordValid(password: string, userPassword: string): boolean {
  		return bcrypt.compareSync(password, userPassword);
	}

	public encodePassword(password: string): string {
  		const salt: string = bcrypt.genSaltSync(10);
  		return bcrypt.hashSync(password, salt);
	}

	private async validate(token: string): Promise<boolean | never> {
		const decoded: unknown = this.jwt.verify(token);
		if (!decoded) {
			throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
		}
		const user: User = await this.validateUser(decoded);
		if (!user) {
			throw new UnauthorizedException();
		}
		return true;
	}
}