import '@fastify/jwt';

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		user: {
			accessType: 'ADMINISTRATOR' | 'MEMBER' | 'GUEST';
			moduleAccess: string[];
			sub: string;
		};
	}
}
