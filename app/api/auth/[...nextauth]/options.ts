/** @format */

import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

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
				if (credentials) {
					const user = await prisma.user.findUnique({
						where: { email: credentials?.email },
					});
					if (user && credentials) {
						const isValid = await bcrypt.compare(
							credentials?.password,
							user?.password,
						);

						if (isValid) {
							return user;
						} else {
							return null;
						}

						// Any object returned will be saved in `user` property of the JWT
					}
				}

				// If you return null then an error will be displayed advising the user to check their details.
				return null;

				// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user, session, account, profile }) => {
			if (user) {
				return {
					...token,
					...user,
					...session,
					...account,
					...profile,
				};
			}
			return null;
		},
		session: async ({ session, token, newSession, user }) => {
			if (token) {
				return {
					...token,
					...user,
					...session,
					...newSession,
				};
			}
			return session;
		},
	},
	pages: {
		error: '/login',
		signIn: '/login',
		signOut: '/',
	},
};
