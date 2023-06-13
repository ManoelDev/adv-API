import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest';

const prisma = new PrismaClient();

function createSchema(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined');
	}
	const databaseUrl = new URL(process.env.DATABASE_URL);
	databaseUrl.searchParams.set('schema', schema);
	return databaseUrl.toString();
}

export default <Environment>{
	name: 'prisma',
	async setup() {
		const schema = randomUUID();
		const databaseUrl = createSchema(schema);

		process.env.DATABASE_URL = databaseUrl;
		process.env.NODE_ENV = 'test';

		execSync('npx prisma migrate deploy');

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
				await prisma.$disconnect();
			},
		};
	},
};
