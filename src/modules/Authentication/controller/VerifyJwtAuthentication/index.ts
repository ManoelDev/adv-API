import { FastifyReply, FastifyRequest } from 'fastify';
import { VerifyJwtAuthenticationSchema } from '../../dtos/VerifyJWTSchema';
import { VerifyJwtAuthenticationFactory } from './factory';

export async function VerifyJwtAuthenticationController(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (err) {
		return reply
			.clearCookie('refreshToken', {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(401)
			.send({ message: 'Unauthorized.' });
	}

	const body = await VerifyJwtAuthenticationSchema.parseAsync({ user: request.user });
	const verify = VerifyJwtAuthenticationFactory();
	const result = await verify.execute(body);

	if (result.isLeft()) {
		return reply.status(401).send({ message: result.value.message });
	}
}
