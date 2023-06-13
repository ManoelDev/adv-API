import { z } from 'zod';

export const CreateAuthenticationSchema = z
	.object({
		email: z
			.string()
			.email('Deve ser um email válido.')
			.nonempty('O email não pode ser vazio.')
			.transform((value) => value.toLowerCase()),
		password: z.string().min(8, 'Deve conter pelo menos 8 caracteres.').max(60, 'Deve conter no máximo 60 caracteres.').nonempty(),
	})
	.strict();

export type CreateAuthenticationDTO = z.infer<typeof CreateAuthenticationSchema>;
