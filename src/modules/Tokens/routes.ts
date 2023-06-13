import { FastifyInstance } from 'fastify';
import { ValidateTokensController } from './controller/ValidateTokens';

export async function TokensRouter(app: FastifyInstance) {
	app.post('/', ValidateTokensController);
}
