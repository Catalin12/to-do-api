import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";
import { Request } from "express";

import { User } from "src/user/user.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") implements IAuthGuard {

	public handleRequest(err: unknown, user: User): any {
		return user;
	}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		await super.canActivate(context);
		const request: Request = context.switchToHttp().getRequest();
		return request ? true : false;
	}
}