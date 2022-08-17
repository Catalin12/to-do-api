import { Injectable, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { User } from "src/user/user.entity";
import { AuthHelper } from "./auth.helper";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	@Inject(AuthHelper)
	private readonly authHelper: AuthHelper;

  	public constructor(@Inject(ConfigService) config: ConfigService) {
  		super({
  			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  			secretOrKey: config.get("JWT_KEY"),
  			ignoreExpiration: false,
  		});
  	}

  	private validate(payload: string): Promise<User | never> {
  		return this.authHelper.validateUser(payload);
  	}
}