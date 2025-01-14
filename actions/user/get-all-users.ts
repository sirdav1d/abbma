/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export async function getAllUserAction(email: string) {
	try {
		const users = await prisma.user.findMany({
			where: { email: email },
		});

		if (users) {
			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: 'Usuários encontrados',
				users: users,
			};
		}
		return { success: false, message: 'Usuários não encontrados', users: null };
	} catch (error) {
		console.log('não encontrado');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			users: null,
		};
	}
}
