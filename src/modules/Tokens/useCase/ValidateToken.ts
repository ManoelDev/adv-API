import { Tokens } from '@prisma/client';
import { TokensRepository } from '../repository/protocols/TokensRepository';
import { InvalidTokenErro } from '../errors/InvalidTokenErro';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ExpiredTokensErro } from '../errors/ExpiredTokensErro';
import { Either, left, right } from '@/infra/http/errors/Either';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

type Response = Either<Error, Tokens>;

export class ValidateTokenUseCase {
	constructor(private tokensRepository: TokensRepository) {
		// do nothing
	}

	async execute(token: string): Promise<Response> {
		const tokens = await this.tokensRepository.findByToken(token);
		if (!tokens) return left(new InvalidTokenErro());
		if (tokens.expired) return left(new ExpiredTokensErro());

		if (!dayjs(new Date()).isBetween(tokens.createdAt, tokens.expiredAt)) return left(new ExpiredTokensErro());

		return right(tokens);
	}
}
