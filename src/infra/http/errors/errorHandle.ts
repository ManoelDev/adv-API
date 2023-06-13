import { env } from '@/infra/env';
import { FastifyError, FastifyReply, FastifyRequest, errorCodes } from 'fastify';
import { ZodError } from 'zod';

export const EnvironmentErrorHandle = (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({ message: 'Validation error.', issues: error.issues[0] });
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
	}

	if (error instanceof errorCodes.FST_ERR_CTP_EMPTY_JSON_BODY) {
		return reply.status(400).send({ message: error.message });
	}

	return reply.status(500).send({ message: 'Internal server error.' });
};
