/** @format */

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: AuthOptions = {
	providers: [
		CredentialsProvider({
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
					where: { email: credentials.email },
				});

				if (
					!user ||
					!(await bcrypt.compare(credentials.password, user.password))
				) {
					return null;
				}

				return user;
				// Any object returned will be saved in `user` property of the JWT

				// If you return null then an error will be displayed advising the user to check their details.

				// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				return {
					...token,
					id: user.id,
					email: user.email,
					name: user.name,
				};
			}
			return token;
		},
		session: async ({ session, token }) => {
			return {
				...session,
				user: {
					id: token.id,
					email: token.email,
					name: token.name,
				},
			};
		},
	},
	pages: {
		error: '/homepage',
		signIn: '/login',
		signOut: '/homepage',
	},
};
