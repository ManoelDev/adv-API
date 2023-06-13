import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { GetMeUserFactory } from './factory';

export const GetUserInPrams = z.object({
	sub: z.string(),
});

export async function GetMeController(request: FastifyRequest, reply: FastifyReply) {
	const { sub } = GetUserInPrams.parse(request.user);

	const update = GetMeUserFactory();
	const result = await update.execute(sub);

	if (result.isLeft()) {
		return reply.status(400).send({ message: result.value.message });
	}

	if (result.isRight()) {
		return reply.status(200).send(result.value);
	}

	return reply.status(200).send();
}
