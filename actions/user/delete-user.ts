/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import SendEmailAction from '../email/sendEmail';
import { generateContentDeleteUser } from '@/constants/email-contents';

export async function deleteUserAction(email: string) {
	try {
		const user = await prisma.user.update({
			where: { email: email },
			data: {
				isActive: false,
				isSubscribed: false,
			},
		});

		if (user && user.name) {
			console.log('usuario encontrado', user);

			//enviar e-mail de confirmação de cadastro

			await SendEmailAction({
				email: 'contato@abbma.org.br',
				subject: 'Cliente Deletado',
				htmlContent: generateContentDeleteUser({ name: user.name }),
			});

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
