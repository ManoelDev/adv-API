import { app } from '@/infra/http/app';
import { createAndAuthenticateUser } from '__tests__/utils/createAndAuthenticateUser';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Profile (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to get user profile', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const profileResponse = await request(app.server).get('/v1/users/me').set('Authorization', `Bearer ${token}`).send();

		expect(profileResponse.statusCode).toEqual(200);
		expect(profileResponse.body).toEqual(
			expect.objectContaining({
				email: 'johndoe@example.com',
				profile: expect.objectContaining({
					name: expect.any(String),
				}),
			})
		);
	});
});
