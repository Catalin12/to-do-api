import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction } from "express";

import { AuthHelper } from "./auth.helper";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
	public constructor(private authHelper: AuthHelper) {}

	public async use(req: any, res: any, next: NextFunction): Promise<any> {
		const authHeader = req.headers["authorization"];
		if (authHeader.startsWith("Bearer ")) {
			const token = authHeader.substring(7, authHeader.length);
			console.log("[CurrentUserMiddleware] token: " + token);
			if (!token) {
				throw new UnauthorizedException("Unauthorized");
			}
			try {
				const user = await this.authHelper.validate(token);
				req.id = user.id;
				console.log("[CurrentUserMiddleware] id: " + req.id)
				next();
			} catch {
				throw new UnauthorizedException();
			}
		}
	}
}