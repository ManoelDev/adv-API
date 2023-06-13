import { verifyJwtAuthenticationUseCase } from '@/modules/Authentication/useCase/verifyJwtAuthentication';
import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';

export function VerifyJwtAuthenticationFactory() {
	const usersRepository = new PrismaUsersRepository();
	const useCase = new verifyJwtAuthenticationUseCase(usersRepository);

	return useCase;
}
