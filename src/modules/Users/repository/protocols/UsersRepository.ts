import { Users } from '@prisma/client';
import { CreateUsersDTO } from '../../dtos/CreateUsers';
import { UpdateUsersDTO } from '../../dtos/UpdateUsers';

export type UsersRepository = {
	findById(id: number): Promise<Users | null>;
	findByUuid(uuid: string): Promise<Users | null>;
	findByEmail(email: string): Promise<Users | null>;
	create(dto: CreateUsersDTO): Promise<Users | null>;
	update(uuid: string, dto: UpdateUsersDTO): Promise<Partial<Users> | null>;
	findMe(uuid: string): Promise<Partial<Users> | null>;
	updatePassword(userId: number, dto: { password: string }): Promise<Partial<Users> | null>;
};
