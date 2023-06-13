import { hash } from 'bcryptjs';
import { z } from 'zod';

export const UpdatePasswordSchema = z
	.object({
		token: z.string().nonempty(),
		email: z.string().email().nonempty(),
		password: z
			.string()
			.nonempty()
			.transform(async (value) => await hash(value, 6)),
	})
	.strict();

export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordSchema>;
