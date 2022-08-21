import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { getEnvPath } from "./common/helper/env.helper";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TaskModule } from "./task/task.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmConfig } from "./typeorm.config";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
	imports: [
		TaskModule,
		UserModule,
		AuthModule,
		PassportModule,
		ConfigModule.forRoot({
			envFilePath,
			isGlobal: true
		}),
		TypeOrmModule.forRoot(TypeOrmConfig),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
