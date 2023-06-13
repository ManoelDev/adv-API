import { CreateAuthenticationUseCase } from '@/modules/Authentication/useCase/CreateAuthentication';
import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';

export function CreateAuthenticationFactory() {
	const usersRepository = new PrismaUsersRepository();
	const createAccountUseCase = new CreateAuthenticationUseCase(usersRepository);

	return createAccountUseCase;
}
