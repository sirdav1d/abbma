/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export async function getUserAction(email: string) {
	try {
		const existUser = await prisma.user.findUnique({
			where: { email: email },
		});

		if (existUser) {
			console.log('encontrado');

			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: 'Usuário cadastrado com sucesso',
				user: existUser,
			};
		}
		return { success: false, message: 'Usuário não encontrado' };
	} catch (error) {
		console.log(error);
		console.log('não encontrado');
		return { success: false, message: 'Algo deu errado, tente novamente' };
	}
}
