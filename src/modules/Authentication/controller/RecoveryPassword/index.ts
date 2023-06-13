import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { RecoveryPasswordSchema } from '../../dtos/RecoveryPassword';
import { RecoveryPasswordFactory } from './factory';

export const GetUserInPrams = z.object({
	sub: z.string(),
});

export async function RecoveryPasswordController(request: FastifyRequest, reply: FastifyReply) {
	const body = await RecoveryPasswordSchema.parseAsync(request.body);

	const update = RecoveryPasswordFactory();

	const result = await update.execute(body);

	if (result.isLeft()) {
		return reply.status(400).send({ message: result.value.message });
	}

	return reply.status(200).send();
}
