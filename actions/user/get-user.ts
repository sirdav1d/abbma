/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';

export async function getUserAction({ email }: { email: string | null }) {
	const session = await auth();
	try {
		const existUser = await prisma.user.findUnique({
			where: { email: email ?? session?.user.email },
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
