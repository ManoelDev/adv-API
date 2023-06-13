import { app } from '@/infra/http/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const BodyObject = {
	email: 'jhondoe@example.com',
	password: '12345678',
};

describe('Create users (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});
	afterAll(async () => {
		await app.close();
	});

	it('should be able create a user', async () => {
		const response = await request(app.server).post('/v1/users').send(BodyObject);

		expect(response.statusCode).toEqual(201);
	});

	it('Should not be able to register with same email twice', async () => {
		await request(app.server).post('/v1/account').send(BodyObject);
		const response = await request(app.server).post('/v1/users').send(BodyObject);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: 'User already exists.',
			})
		);
	});
});
