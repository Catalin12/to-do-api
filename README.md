#Usage

##Configuration
Add a new file named "typeorm.config.ts" in /src folder with the content:

```import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "./task/task.entity";
import { User } from "./user/user.entity";

export const TypeOrmConfig: TypeOrmModuleOptions = {
	type: "postgres",
	host: "127.0.0.1",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "to-do-db",
	synchronize: true,
	entities: [Task, User],
	migrations: ["./src/migrations/*.ts"]
};
```

Replace username and password values with your own database settings.
