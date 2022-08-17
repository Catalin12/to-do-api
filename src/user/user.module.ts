import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "src/auth/auth.module";
import { CurrentUserMiddleware } from "src/auth/current-user.middleware";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserMapper } from "./user.mapper";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User]),
		AuthModule
	],
	controllers: [UserController],
	providers: [UserService, UserMapper],
	exports: [UserService, UserMapper]
})
export class UserModule {
	public configure(consumer: MiddlewareConsumer): any {
		consumer.apply(CurrentUserMiddleware).forRoutes(
		  "user/current",
		  "task"
		);
	  }
}