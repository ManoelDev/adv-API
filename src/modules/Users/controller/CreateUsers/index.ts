import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUsersSchema } from '../../dtos/CreateUsers';
import { CreateUsersFactory } from './factory';

export async function CreateUsersController(request: FastifyRequest, reply: FastifyReply) {
	const body = await CreateUsersSchema.parseAsync(request.body);
	const createUsers = CreateUsersFactory();

	const result = await createUsers.execute(body);

	if (result.isLeft()) {
		return reply.status(400).send({ message: result.value.message });
	}

	return reply.status(201).send();
}
