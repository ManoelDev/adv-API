import { z } from 'zod';

export const RecoveryPasswordSchema = z
	.object({
		email: z.string().email(),
		type: z.enum(['EMAIL', 'PHONE']).default('EMAIL'),
	})
	.strict();

export type RecoveryPasswordDTO = z.infer<typeof RecoveryPasswordSchema>;
