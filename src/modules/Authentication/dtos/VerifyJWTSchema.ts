import { z } from 'zod';

export const VerifyJwtAuthenticationSchema = z
	.object({
		user: z.object({
			sub: z.string(),
			accessType: z.string().optional(),
			moduleAccess: z.array(z.string()).optional(),
		}),
	})
	.strict();

export type VerifyJwtAuthenticationDTO = z.infer<typeof VerifyJwtAuthenticationSchema>;
