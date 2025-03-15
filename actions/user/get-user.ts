/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export async function getUserAction({ email }: { email: string }) {
	try {
		const existUser = await prisma.user.findUnique({
			where: { email: email },
		});

		if (existUser) {
			console.log('encontrado');

			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: 'Usuário encontrado com sucesso',
				user: existUser,
			};
		}
		return { success: false, message: 'Usuário não encontrado', user: null };
	} catch (error) {
		console.log('não encontrado', error);
		return {
			success: false,
			message: `Algo deu errado`,
			user: null,
		};
	}
}
