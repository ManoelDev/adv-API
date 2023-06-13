import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUsersRoles(roleToVerify: { accessType: 'ADMINISTRATOR' | 'MEMBER' | 'GUEST' }) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { accessType } = request.user;

		if (accessType !== roleToVerify.accessType) {
			return reply.status(401).send({ message: 'Unauthorized.' });
		}
	};
}
