import { prisma } from '@/libs/prisma';
import { TokensRepository } from '../protocols/TokensRepository';
import { randomUUID } from 'crypto';
import { Prisma, Tokens } from '@prisma/client';
import { CreateTokenDTO } from '../../dtos/CreateToken';

export class PrismaTokensRepository implements TokensRepository {
	async update(id: number, data: Prisma.TokensUpdateInput): Promise<Tokens | null> {
		const query = await prisma.tokens.update({
			where: { id },
			data,
		});

		return query;
	}
	verifyUserId(userId: number): Promise<Tokens | null> {
		const query = prisma.tokens.findFirst({
			where: {
				userId,
				expired: false,
				OR: [{ expiredAt: { gt: new Date() } }],
			},
		});

		return query;
	}
	findByToken(token: string): Promise<Tokens | null> {
		const query = prisma.tokens.findFirst({
			where: { token },
		});

		return query;
	}
	async findById(id: number) {
		const query = await prisma.tokens.findUnique({
			where: { id },
		});

		return query;
	}

	async findByUuid(uuid: string) {
		const query = await prisma.tokens.findUnique({
			where: { uuid },
		});

		return query;
	}

	async create(userId: number, data: CreateTokenDTO) {
		const query = await prisma.tokens.create({
			data: {
				expiredAt: data.expiredAt,
				type: data.type,
				token: data.token ?? randomUUID(),
				users: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return query;
	}
}
