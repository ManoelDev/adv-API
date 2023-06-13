import { z } from 'zod';

export const ValidateTokensSchema = z
	.object({
		token: z.string().nonempty(),
	})
	.strict();

export type ValidateTokensDTO = z.infer<typeof ValidateTokensSchema>;
