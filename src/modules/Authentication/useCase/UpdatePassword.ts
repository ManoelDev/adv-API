import { Users } from '@prisma/client';
import { UsersRepository } from '@/modules/Users/repository/protocols/UsersRepository';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';
import { UpdatePasswordDTO } from '../dtos/UpdatePassword';
import { TokensRepository } from '@/modules/Tokens/repository/protocols/TokensRepository';
import { ValidateTokenUseCase } from '@/modules/Tokens/useCase/ValidateToken';
import { InvalidTokenErro } from '@/modules/Tokens/errors/InvalidTokenErro';
import { Either, left, right } from '@/infra/http/errors/Either';

type Response = Either<InvalidCredentialsError, Partial<Users>>;

export class UpdatePasswordUseCase {
	constructor(private usersRepository: UsersRepository, private tokenRepository: TokensRepository) {
		// do nothing
	}

	async execute(body: UpdatePasswordDTO): Promise<Response> {
		const findUser = await this.usersRepository.findByEmail(body.email);
		if (!findUser) return left(new InvalidCredentialsError());

		const tokenUseCase = new ValidateTokenUseCase(this.tokenRepository);
		const token = await tokenUseCase.execute(body.token);
		if (token.isLeft()) return left(new Error(token.value.message));
		if (token.value.userId !== findUser.id) return left(new InvalidTokenErro());

		const removeToken = await this.tokenRepository.update(token.value.id, { expired: true });
		if (!removeToken) return left(new InvalidCredentialsError());

		const user = await this.usersRepository.updatePassword(findUser.id, { password: body.password });
		if (!user) return left(new InvalidCredentialsError());

		console.log('return', {
			to: findUser.email,
			subject: 'Recuperação de senha',
			templatePath: 'passwordChanged',
			variables: {},
		});

		return right(user);
	}
}
