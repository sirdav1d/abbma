/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export async function deleteDependentAction(id: string) {
	try {
		const dependent = await prisma.dependent.update({
			where: { id: id },
			data: {
				isActive: false,
			},
		});

		if (dependent) {
			console.log('dependente encontrado', dependent);

			//enviar e-mail de confirmação de cadastro
			return {
				ok: true,
				message: 'dependente deletado com sucesso',
			};
		}

		return { ok: false, message: 'dependente não encontrado' };
	} catch (error) {
		return {
			ok: false,
			message: 'Algo deu errado, tente novamente',
			error: error,
		};
	}
}
