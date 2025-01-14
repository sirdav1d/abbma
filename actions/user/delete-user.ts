/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export async function deleteUserAction(email: string) {
	try {
		const user = await prisma.user.update({
			where: { email: email },
			data: {
				isActive: false,
				isSubscribed: false,
			},
		});

		if (user) {
			console.log('usuario encontrado', user);

			//enviar e-mail de confirmação de cadastro
			return {
				ok: true,
				message: 'Usuário deletado com sucesso',
			};
		}

		return { ok: false, message: 'Usuário não encontrado' };
	} catch (error) {
		return {
			ok: false,
			message: 'Algo deu errado, tente novamente',
			error: error,
		};
	}
}
