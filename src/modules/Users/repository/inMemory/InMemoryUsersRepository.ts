import { Addresses, Profiles, Users } from '@prisma/client';
import { UsersRepository } from '../protocols/UsersRepository';
import { CreateUsersDTO } from '../../dtos/CreateUsers';
import { UpdateUsersDTO } from '../../dtos/UpdateUsers';

export class InMemoryUsersRepository implements UsersRepository {
	private users: Users[] = [];
	private profiles: Profiles[] = [];
	private addresses: Addresses[] = [];

	updatePassword(userId: number, dto: { password: string }): Promise<Partial<Users> | null> {
		const user = this.users.find((user) => user.id === userId);
		if (!user) return Promise.resolve(null);

		const updatedUser = {
			...user,
			password: dto.password,
			updatedAt: new Date(),
		};

		this.users = this.users.map((user) => {
			if (user.id === userId) {
				return updatedUser;
			}
			return user;
		});

		return Promise.resolve(updatedUser);
	}

	findById(id: number): Promise<Users | null> {
		const user = this.users.find((user) => user.id === id);
		return Promise.resolve(user || null);
	}
	findByUuid(uuid: string): Promise<Users | null> {
		const user = this.users.find((user) => user.uuid === uuid);
		return Promise.resolve(user || null);
	}
	async findByEmail(email: string): Promise<Users | null> {
		const user = this.users.find((user) => user.email === email);

		return Promise.resolve(user || null);
	}
	async create(dto: CreateUsersDTO): Promise<Users | null> {
		const { profile, address, ...rest } = dto;
		const obj: Users = {
			...rest,
			profileId: this.profiles.length + 1,
			id: this.users.length + 1,
			uuid: 'uuid',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.profiles.push({
			id: obj.profileId,
			uuid: 'uuid',
			name: profile?.name ?? null,
			birthDay: profile?.birthDay ?? null,
			document: profile?.document ?? null,
			bio: profile?.bio ?? null,
			phone: profile?.phone ?? null,
			slug: profile?.slug ?? null,
			addressId: this.addresses.length + 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		this.addresses.push({
			id: this.addresses.length + 1,
			uuid: 'uuid',
			country: address?.country ?? null,
			state: address?.state ?? null,
			city: address?.city ?? null,
			neighbourhood: address?.neighbourhood ?? null,
			zipCode: address?.zipCode ?? null,
			street: address?.street ?? null,
			number: address?.number ?? null,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		this.users.push(obj);

		return Promise.resolve(obj);
	}
	async update(uuid: string, dto: UpdateUsersDTO): Promise<Partial<Users> | null> {
		const { profile, address, ...rest } = dto;

		const index = this.users.findIndex((user) => user.uuid === uuid);
		const user = this.users[index];
		const profileIndex = this.profiles.findIndex((profile) => profile.id === user.profileId);
		const addressIndex = this.addresses.findIndex((address) => address.id === user.profileId);

		if (!index) {
			return Promise.resolve(null);
		}

		user.password = rest.password ?? user.password;

		this.profiles[profileIndex] = {
			...this.profiles[profileIndex],
			...profile,
			updatedAt: new Date(),
		};

		this.addresses[addressIndex] = {
			...this.addresses[addressIndex],
			...address,
			updatedAt: new Date(),
		};

		return Promise.resolve({
			email: user.email,
			profile: {
				...this.profiles[profileIndex],
				address: this.addresses[addressIndex],
			},
		});
	}
	async findMe(uuid: string): Promise<Partial<Users> | null> {
		const user = this.users.find((user) => user.uuid === uuid);
		const profile = this.profiles.find((profile) => profile.id === user?.profileId);
		const address = this.addresses.find((address) => address.id === profile?.addressId);

		if (!user) {
			return Promise.resolve(null);
		}

		return Promise.resolve({
			email: user.email,
			profile,
			address,
		});
	}
}
