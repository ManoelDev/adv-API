import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UpdateUsersSchema } from '../../dtos/UpdateUsers';
import { UpdateUsersFactory } from './factory';

export const GetUserInPrams = z.object({
	sub: z.string(),
});

export async function UpdateUsersController(request: FastifyRequest, reply: FastifyReply) {
	const { sub } = GetUserInPrams.parse(request.user);
	const body = await UpdateUsersSchema.parseAsync(request.body);

	const update = UpdateUsersFactory();

	const result = await update.execute(sub, body);

	if (result.isLeft()) {
		return reply.status(400).send({ message: result.value.message });
	}

	return reply.status(200).send(result.value);
}
