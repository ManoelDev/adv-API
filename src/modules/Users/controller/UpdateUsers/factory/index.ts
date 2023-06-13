import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';
import { UpdateUsersUseCase } from '@/modules/Users/useCases/UpdateUsers';

export function UpdateUsersFactory() {
	const usersRepository = new PrismaUsersRepository();

	return new UpdateUsersUseCase(usersRepository);
}
