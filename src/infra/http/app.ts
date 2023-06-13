import { env } from '../env';

import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';

import { EnvironmentErrorHandle } from './errors/errorHandle';
import { AppRoutesV1 } from './router/v1';

export const app = fastify();

app.register(cors, { origin: env.CORS_ORIGIN, hook: 'preHandler' });

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	decode: { complete: true },
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
});

app.setErrorHandler(EnvironmentErrorHandle);

app.register(fastifyCookie);
app.register(AppRoutesV1, { prefix: '/v1' });
