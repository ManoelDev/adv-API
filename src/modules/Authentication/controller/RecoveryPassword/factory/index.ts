import { RecoveryPasswordUseCase } from '@/modules/Authentication/useCase/RecoveryPassword';
import { PrismaTokensRepository } from '@/modules/Tokens/repository/prisma';
import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';

export function RecoveryPasswordFactory() {
	const usersRepository = new PrismaUsersRepository();
	const tokensRepository = new PrismaTokensRepository();

	const useCase = new RecoveryPasswordUseCase(usersRepository, tokensRepository);
	return useCase;
}
