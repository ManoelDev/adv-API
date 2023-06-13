import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';
import { CreateUserUseCase } from '@/modules/Users/useCases/CreateUsers';

export function CreateUsersFactory() {
	const usersRepository = new PrismaUsersRepository();
	const createUsersUseCase = new CreateUserUseCase(usersRepository);

	return createUsersUseCase;
}
