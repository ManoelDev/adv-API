import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdatePasswordFactory } from './factory';
import { UpdatePasswordSchema } from '../../dtos/UpdatePassword';

export async function UpdatePasswordController(request: FastifyRequest, reply: FastifyReply) {
	const body = await UpdatePasswordSchema.parseAsync(request.body);
	const factory = UpdatePasswordFactory();

	const result = await factory.execute(body);

	if (result.isLeft()) {
		return reply.status(400).send({ message: result.value.message });
	}

	return reply.status(200).send();
}
