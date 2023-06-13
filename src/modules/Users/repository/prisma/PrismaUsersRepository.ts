import { Users } from '@prisma/client';
import { prisma } from '@/libs/prisma';
import { CreateUsersDTO } from '../../dtos/CreateUsers';
import { UsersRepository } from '../protocols/UsersRepository';
import { UpdateUsersDTO } from '../../dtos/UpdateUsers';

export class PrismaUsersRepository implements UsersRepository {
	async updatePassword(userId: number, dto: { password: string }): Promise<Partial<Users> | null> {
		const query = await prisma.users.update({
			where: { id: userId },
			data: { password: dto.password },
		});
		return query;
	}
	async findMe(uuid: string): Promise<Partial<Users> | null> {
		const query = await prisma.users.findUnique({
			where: { uuid },
			select: {
				email: true,
				profile: {
					select: {
						name: true,
						document: true,
						birthDay: true,
						phone: true,
						bio: true,
						slug: true,
						address: {
							select: {
								country: true,
								state: true,
								city: true,
								neighbourhood: true,
								zipCode: true,
								street: true,
								number: true,
							},
						},
					},
				},
			},
		});
		if (query instanceof Error) return null;
		return query;
	}

	async update(uuid: string, dto: UpdateUsersDTO): Promise<Partial<Users> | null> {
		const { profile, address, ...rest } = dto;
		const query = await prisma.users.update({
			where: { uuid },
			data: {
				...rest,
				profile: { update: { ...profile, address: { update: { ...address } } } },
			},
			select: {
				email: true,
				profile: {
					select: {
						name: true,
						document: true,
						birthDay: true,
						phone: true,
						bio: true,
						slug: true,
						address: {
							select: {
								country: true,
								state: true,
								city: true,
								neighbourhood: true,
								zipCode: true,
								street: true,
								number: true,
							},
						},
					},
				},
			},
		});

		if (query instanceof Error) return null;

		return query;
	}

	async findByUuid(uuid: string): Promise<Users | null> {
		const query = await prisma.users.findUnique({ where: { uuid } });
		if (query instanceof Error) return null;
		return query;
	}

	async findByEmail(email: string): Promise<Users | null> {
		const query = await prisma.users.findUnique({ where: { email } });
		if (query instanceof Error) return null;
		return query;
	}

	async findById(id: number): Promise<Users | null> {
		const query = await prisma.users.findUnique({ where: { id } });
		if (query instanceof Error) return null;
		return query;
	}

	async create(dto: CreateUsersDTO): Promise<Users | null> {
		const { profile, address, ...rest } = dto;
		const query = await prisma.users.create({
			data: {
				...rest,
				profile: { create: { ...profile, address: { create: { ...address } } } },
			},
			include: { profile: { include: { address: true } } },
		});
		return query;
	}
}
