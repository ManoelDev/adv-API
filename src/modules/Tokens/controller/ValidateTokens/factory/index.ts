import { PrismaTokensRepository } from '@/modules/Tokens/repository/prisma';
import { ValidateTokenUseCase } from '@/modules/Tokens/useCase/ValidateToken';

export function ValidateTokensFactory() {
	const tokensRepository = new PrismaTokensRepository();
	const useCase = new ValidateTokenUseCase(tokensRepository);

	return useCase;
}
