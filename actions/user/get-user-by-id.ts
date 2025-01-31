/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export async function getUserByIdAction({ id }: { id: string }) {
	try {
		const existUser = await prisma.user.findUnique({
			where: { id: id },
		});

		if (existUser) {
			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: 'Usuário encontrado com sucesso',
				user: existUser,
			};
		}
		return { success: false, message: 'Usuário não encontrado', user: null };
	} catch (error) {
		console.log('não encontrado');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			user: null,
		};
	}
}
