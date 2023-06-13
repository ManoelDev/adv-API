import { compare } from 'bcryptjs';
import { Users } from '@prisma/client';
import { UsersRepository } from '@/modules/Users/repository/protocols/UsersRepository';
import { CreateAuthenticationDTO } from '../dtos/CreateAuthenticationSchema';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';
import { Either, left, right } from '@/infra/http/errors/Either';

type Response = Either<InvalidCredentialsError, Users>;

export class CreateAuthenticationUseCase {
	constructor(private usersRepository: UsersRepository) {
		// do nothing
	}

	async execute(body: CreateAuthenticationDTO): Promise<Response> {
		const user = await this.usersRepository.findByEmail(body.email);
		if (!user) return left(new InvalidCredentialsError());

		const isValidPassword = await compare(body.password, user.password);
		if (!isValidPassword) return left(new InvalidCredentialsError());

		return right(user);
	}
}
