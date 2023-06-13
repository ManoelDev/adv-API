import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.coerce.number().default(3333),
	HOST: z.coerce.string().default('127.0.0.1'),
	CORS_ORIGIN: z.array(z.string()).default(['*']),
	JWT_SECRET: z.string().default('secret-development'),
	WEB_APP_URL: z.string().default('http://localhost:3000/'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error('Invalid environment variables.', _env.error.format());
	throw new Error('Invalid environment variables.');
}

export const env = _env.data;
