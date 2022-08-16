export interface UserDTO {
	id: number;
	email: string;
	password: string;
	name: string;
	lastLoginAt: Date;
	tasks: number[];
}