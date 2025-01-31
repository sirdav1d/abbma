/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export async function getDependentByIdAction({ id }: { id: string }) {
	try {
		const existUser = await prisma.dependent.findUnique({
			where: { id: id },
		});

		if (existUser) {
			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: 'Dependente encontrado com sucesso',
				dependent: existUser,
			};
		}
		return {
			success: false,
			message: 'Dependente não encontrado',
			dependent: null,
		};
	} catch (error) {
		console.log('não encontrado');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			dependent: null,
		};
	}
}
