import { Users } from '@prisma/client';
import { UsersRepository } from '../repository/protocols/UsersRepository';
import { UpdateUsersDTO } from '../dtos/UpdateUsers';
import { UsersUpdateError } from '../errors/UsersUpdateError';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { Either, left, right } from '@/infra/http/errors/Either';

type Response = Either<Error, Partial<Users>>;

export class UpdateUsersUseCase {
	constructor(private usersRepository: UsersRepository) {
		// do nothing
	}

	async execute(userUuid: string, data: UpdateUsersDTO): Promise<Response> {
		const user = await this.usersRepository.findByUuid(userUuid);
		if (!user) return left(new UserNotFoundError());

		const update = await this.usersRepository.update(userUuid, data);
		if (!update) return left(new UsersUpdateError());

		return right(update);
	}
}
