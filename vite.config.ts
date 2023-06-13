import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environmentMatchGlobs: [['__tests__/e2e/**/*.{spec,test}.{ts,tsx}', 'prisma']],
	},
});
