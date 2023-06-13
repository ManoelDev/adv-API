import { app } from '@/infra/http/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';

const BodyObject = {
	email: 'jhondoe@example.com',
	password: '12345678',
};

describe('Authenticate (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});
	afterAll(async () => {
		await app.close();
	});

	it('should not able authenticate the email incorrect', async () => {
		const response = await request(app.server).post('/v1/session').send({ email: 'jhontree@example.com', password: '12345678' });

		expect(response.status).toEqual(400);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: 'Invalid credentials.',
			})
		);
	});

	it('should not able authenticate the password incorrect', async () => {
		const response = await request(app.server).post('/v1/session').send({ email: BodyObject.email, password: '1234567' });

		expect(response.status).toEqual(400);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: 'Validation error.',
				issues: expect.objectContaining({
					message: 'Deve conter pelo menos 8 caracteres.',
				}),
			})
		);
	});

	it('should be able to authenticate', async () => {
		await request(app.server).post('/v1/users').send(BodyObject);

		const response = await request(app.server).post('/v1/session').send(BodyObject);

		expect(response.status).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
