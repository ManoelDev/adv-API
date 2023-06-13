import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';
import { GetMeUserUseCase } from '@/modules/Users/useCases/GetMeUser';

export function GetMeUserFactory() {
	const usersRepository = new PrismaUsersRepository();

	return new GetMeUserUseCase(usersRepository);
}
