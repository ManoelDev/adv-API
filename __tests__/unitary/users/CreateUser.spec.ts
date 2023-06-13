import { UserAlreadyExistsError } from '@/modules/Users/errors/UsersAlreadyExistsError';
import { InMemoryUsersRepository } from '@/modules/Users/repository/inMemory/InMemoryUsersRepository';
import { CreateUserUseCase } from '@/modules/Users/useCases/CreateUsers';
import { describe, it, beforeEach, expect } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

const BodyObject = {
	email: 'jhondoe@example.com',
	password: '12345678',
};

describe('Create Account (UNIT)', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new CreateUserUseCase(usersRepository);
	});

	it('Should be able create a new user', async () => {
		const response = await sut.execute(BodyObject);
		expect(response.isRight()).toBe(true);
		expect(response.value).toHaveProperty('email');
	});

	it('Should not be able to register with same email twice', async () => {
		await sut.execute(BodyObject);

		const response = await sut.execute(BodyObject);
		expect(response.isLeft()).toBe(true);
		expect(response.value).toBeInstanceOf(Error);
		expect(response.value).toBeInstanceOf(UserAlreadyExistsError);
	});
});
