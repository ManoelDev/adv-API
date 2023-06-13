import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateAuthenticationSchema } from '../../dtos/CreateAuthenticationSchema';
import { CreateAuthenticationFactory } from './factory';

export async function CreateAuthenticationController(request: FastifyRequest, reply: FastifyReply) {
	const body = await CreateAuthenticationSchema.parseAsync(request.body);
	const authentication = CreateAuthenticationFactory();

	const result = await authentication.execute(body);

	if (result.isLeft()) {
		return reply.status(400).send({ message: result.value.message });
	}

	const token = await reply.jwtSign({}, { sign: { sub: result.value.uuid } });
	const refreshToken = await reply.jwtSign({}, { sign: { sub: result.value.uuid, expiresIn: '7d' } });

	return reply
		.setCookie('refreshToken', refreshToken, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.status(200)
		.send({ token });
}
