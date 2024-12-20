/** @format */

import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
	interface Session {
		user: PrismaUser & {
			id: string; // Adiciona o ID do usuário, como no seu modelo Prisma
			email: string;
			name?: string;
			image?: string;
			readonly;
			// Adicione outros campos personalizados aqui, se necessário
		};
	}
}
