import { AuthenticationRouter } from '@/modules/Authentication/routes';
import { TokensRouter } from '@/modules/Tokens/routes';
import { PrivateUsersRouter, PublicUsersRouter } from '@/modules/Users/routes';
import { FastifyInstance } from 'fastify';

export async function AppRoutesV1(app: FastifyInstance) {
	app.register(PublicUsersRouter, { prefix: '/users' });
	app.register(PrivateUsersRouter, { prefix: '/users' });
	app.register(AuthenticationRouter, { prefix: '/session' });
	app.register(TokensRouter, { prefix: '/tokens' });
}
