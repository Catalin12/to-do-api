# Usage

## Configuration

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

# API AUTHENTICATION

## REGISTER

### Request

`POST /auth/register`

### Body

```{
  "email": "email@test.com",
  "password": "123456789",
  "name": "name"
}
```

### Response

```{
  "name": "name",
  "email": "email@test.com",
  "lastLoginAt": null,
  "id": 1
}
```

## LOGIN

### Request

`POST /auth/login`

### Body

```{
  "email": "email@test.com",
  "password": "123456789"
}
```

### Response

token

# API CALLS

The following calls require a Bearer Token

## ADD A TASK

### Request

`POST /task`

### Body

```{
	"title": "title",
	"description": "description",
	"isDeleted": false,
	"isCompleted": false,
	"userId": 1
}
```

## GET ALL TASKS

### Request

`GET /task`

### Response

```[
	{
    "id": 21,
    "title": "Gifts",
    "description": "Buy flowers for mom",
    "isDeleted": true,
    "isCompleted": false,
    "userId": 4
  },
  ...
]
```

## DELETE A TASK

### Request

`PATCH /task/delete/:id`

### Response

Returns the updated object with "isDeleted": true

## CHANGE THE STATUS OF A TASK

### Request

`PATCH /task/status/:id`

### Response

Returns the updated object with "isCompleted" modified

## UPDATE A TASK

### Request

`PATCH /task/update`

### Body

```{
	"id": 1,
	"title": "title",
	"description": "description",
	"isDeleted": false,
	"isCompleted": false,
	"userId": 1
}
```

### Response

Returns the updated object
