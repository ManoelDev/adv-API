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

	it('should be able to update user profile', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const profileResponse = await request(app.server)
			.post('/v1/users/update')
			.set('Authorization', `Bearer ${token}`)
			.send({
				profile: {
					name: 'John Tree',
					document: '0987654321',
					birthDay: new Date('1999-01-01'),
					phone: '987654321',
					bio: "I'm a developer",
					slug: 'john-tree',
					address: {
						street: 'Rua 1',
						number: '123',
						neighbourhood: 'Bairro 1',
						city: 'Cidade 1',
						state: 'Estado 1',
						zipCode: '12345678',
						country: 'País 1',
					},
				},
			});

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
