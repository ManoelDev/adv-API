import { hash } from 'bcryptjs';
import { z } from 'zod';

export const CreateUsersSchema = z
	.object({
		email: z
			.string()
			.email('Deve ser um email válido.')
			.nonempty('O email não pode ser vazio.')
			.transform((value) => value.toLowerCase().replace(/\s/g, '')),

		password: z
			.string()
			.min(8, 'Deve conter pelo menos 8 caracteres.')
			.max(60, 'Deve conter no máximo 60 caracteres.')
			.nonempty()
			.transform(async (value) => await hash(value, 6)),

		profile: z
			.object({
				name: z.string().optional(),
				document: z.string().optional(),
				birthDay: z.date().optional(),
				phone: z.string().optional(),
				bio: z.string().optional(),
				slug: z.string().optional(),
			})
			.optional(),

		address: z
			.object({
				country: z.string().optional(),
				state: z.string().optional(),
				city: z.string().optional(),
				neighbourhood: z.string().optional(),
				zipCode: z.string().optional(),
				street: z.string().optional(),
				number: z.string().optional(),
			})
			.optional(),
	})
	.strict();

export type CreateUsersDTO = z.infer<typeof CreateUsersSchema>;
