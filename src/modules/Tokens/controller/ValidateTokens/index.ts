import { FastifyReply, FastifyRequest } from 'fastify';

import { ValidateTokensFactory } from './factory';
import { ValidateTokensSchema } from '../../dtos/ValidateTokens';

export async function ValidateTokensController(request: FastifyRequest, reply: FastifyReply) {
	const body = await ValidateTokensSchema.parseAsync(request.body);
	const useCase = ValidateTokensFactory();

	const result = await useCase.execute(body.token);

	if (result.isLeft()) {
		return reply.status(400).send({ message: result.value.message });
	}

	return reply.status(200).send({
		token: result.value.token,
	});
}
