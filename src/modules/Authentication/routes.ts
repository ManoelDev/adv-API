import { FastifyInstance } from 'fastify';
import { CreateAuthenticationController } from './controller/CreateAuthentication';
import { RefreshAuthentication } from './controller/RefreshAuthentication';
import { VerifyJwtAuthenticationController } from './controller/VerifyJwtAuthentication';
import { RecoveryPasswordController } from './controller/RecoveryPassword';
import { UpdatePasswordController } from './controller/UpdatePassword';

export async function AuthenticationRouter(app: FastifyInstance) {
	app.post('/', CreateAuthenticationController);
	app.post('/recovery-password', RecoveryPasswordController);
	app.post('/update-password', UpdatePasswordController);
	app.post('/refresh', { onRequest: [VerifyJwtAuthenticationController] }, RefreshAuthentication);
}
