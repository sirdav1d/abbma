/** @format */

import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcrypt';
import { prisma } from '../prisma';

export default {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'E-mail',
					type: 'email',
					placeholder: 'email@email.com',
				},
				password: {
					label: 'Senha',
					type: 'password',
					placeholder: 'Digite sua senha',
				},
			},
			type: 'credentials',
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email as string },
				});

				if (user && user.password) {
					const isValid = await bcrypt.compare(
						credentials.password as string,
						user.password,
					);

					if (isValid) {
						return user;
					}
				}
				return null; // Retorna null se credenciais estiverem incorretas
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				return token;
			}
			return token; // NÃO retornar `null`
		},
		session: async ({ session, token }) => {
			session.user.id = token.id as string;
			session.user.email = token.email as string;
			session.user.name = token.name as string;
			return session;
		},
	},
	pages: {
		error: '/login',
		signIn: '/login',
		signOut: '/login',
	},
} satisfies NextAuthConfig;
