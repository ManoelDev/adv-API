import { Prisma, Tokens } from '@prisma/client';
import { CreateTokenDTO } from '../../dtos/CreateToken';

export type TokensRepository = {
	findById(id: number): Promise<Tokens | null>;
	findByUuid(uuid: string): Promise<Tokens | null>;
	findByToken(token: string): Promise<Tokens | null>;
	create(userId: number, data: CreateTokenDTO): Promise<Tokens | null>;
	verifyUserId(userId: number): Promise<Tokens | null>;
	update(id: number, data: Prisma.TokensUpdateInput): Promise<Tokens | null>;
};
