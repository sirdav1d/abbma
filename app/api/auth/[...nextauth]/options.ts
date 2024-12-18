/** @format */

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
				const user = {
					id: '1',
					name: 'Usuário Teste',
					email: 'ddavid.diniz@gmail.com',
					password: 'bzg3xp7yt',
				};

				if (
					credentials?.email === user.email &&
					credentials?.password === user.password
				) {
					return user;
					// Any object returned will be saved in `user` property of the JWT
				}
				// If you return null then an error will be displayed advising the user to check their details.
				return null;

				// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			},
		}),
	],
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
			return token;
		},
		session: async ({ session, token, newSession, user }) => {
			return {
				...token,
				...user,
				...session,
				...newSession,
			};
		},
	},
	pages: {
		error: '/login',
		signIn: '/login',
		signOut: '/',
	},
};
