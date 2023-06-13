import { prisma } from '@/libs/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
	await prisma.users.create({
		data: {
			email: 'johndoe@example.com',
			password: await hash('12345678', 6),
			profile: {
				create: {
					name: 'John Doe',
					document: '12345678910',
					birthDay: new Date(),
					phone: '12345678910',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis.',
					slug: 'john-doe',
					address: {
						create: {
							country: 'Brasil',
							state: 'São Paulo',
							city: 'São Paulo',
							neighbourhood: 'Jardim Paulista',
							street: 'Rua dos bobos',
							zipCode: '12345678',
							number: '123',
						},
					},
				},
			},
		},
	});

	const authResponse = await request(app.server).post('/v1/session').send({
		email: 'johndoe@example.com',
		password: '12345678',
	});

	const { token } = authResponse.body;

	return { token };
}
