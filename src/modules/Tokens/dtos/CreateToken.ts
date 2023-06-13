import { z } from 'zod';

export const CreateTokenSchema = z
	.object({
		token: z.string().optional(),
		type: z.enum(['EMAIL', 'PHONE']),
		expiredAt: z.date(),
	})
	.strict();

export type CreateTokenDTO = z.infer<typeof CreateTokenSchema>;
