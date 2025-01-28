/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import SendEmailAction from '../email/sendEmail';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { generateContentDeleteDependent } from '@/constants/email-contents';

export async function deleteDependentAction(id: string) {
	const session = await getServerSession();

	if (!session?.user) {
		redirect('/login');
	}
	try {
		const dependent = await prisma.dependent.update({
			where: { id: id },
			data: {
				isActive: false,
			},
		});

		if (dependent) {
			console.log('dependente encontrado', dependent);

			await SendEmailAction({
				email: 'contato@abbma.org.br',
				subject: 'Cliente Deletou Um Dependente',
				htmlContent: generateContentDeleteDependent({
					name: session.user.name ?? '',
				}),
			});

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
