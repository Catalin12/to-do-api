[block:api-header]
{
"title": "Configurare"
}
[/block]
Add a new file named "typeorm.config.ts" in /src folder with the content:
[block:code]
{
"codes": [
{
"code": "import { TypeOrmModuleOptions } from \"@nestjs/typeorm\";\nimport { Task } from \"./task/task.entity\";\nimport { User } from \"./user/user.entity\";\n\nexport const TypeOrmConfig: TypeOrmModuleOptions = {\n\ttype: \"postgres\",\n\thost: \"127.0.0.1\",\n\tport: 5432,\n\tusername: \"postgres\",\n\tpassword: \"postgres\",\n\tdatabase: \"to-do-db\",\n\tsynchronize: true,\n\tentities: [Task, User],\n\tmigrations: [\"./src/migrations/*.ts\"]\n};",
"language": "typescript",
"name": "typeorm.config.ts"
}
]
}
[/block]
Replace username and password values with your own database settings.
