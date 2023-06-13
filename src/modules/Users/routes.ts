import { FastifyInstance } from 'fastify';
import { CreateUsersController } from './controller/CreateUsers';
import { UpdateUsersController } from './controller/UpdateUsers';
import { GetMeController } from './controller/GetMeUsers';
import { VerifyJwtAuthenticationController } from '../Authentication/controller/VerifyJwtAuthentication';

export async function PublicUsersRouter(app: FastifyInstance) {
	app.post('/', CreateUsersController);
}

export async function PrivateUsersRouter(app: FastifyInstance) {
	app.addHook('onRequest', VerifyJwtAuthenticationController);

	app.get('/me', { preValidation: [VerifyJwtAuthenticationController] }, GetMeController);
	app.post('/update', { preValidation: [VerifyJwtAuthenticationController] }, UpdateUsersController);
}
