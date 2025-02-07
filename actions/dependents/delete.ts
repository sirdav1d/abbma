/** @format */

'use server';

import { generateContentDeleteDependent } from '@/constants/email-contents';
import { prisma } from '@/lib/prisma';
import { getTitle } from '@/utils/get-title-ticket';

import { redirect } from 'next/navigation';
import SendEmailAction from '../email/sendEmail';
import GetAllTicketsAction from '../tickets/get-all-tickets';
import { revalidateTag } from 'next/cache';
import { auth } from '@/lib/auth/auth';

export async function deleteDependentAction(id: string) {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}

	const { data } = await GetAllTicketsAction({ email: session.user.email });

	const ticket = data?.find((item) => item.type !== 'CLUB_VANTAGES');

	if (!ticket) {
		return {
			success: false,
			message: 'Sem Plano associado para cadastrar dependente',
			dependent: null,
		};
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

			await prisma.updates.create({
				data: {
					ticketId: ticket.id,
					message: `Usuário ${session.user.name} solicitou a exclusão do dependente: ${dependent.name} - ${dependent.email} - ${dependent.degree} - ${dependent.phone} - ${dependent.date_birth} no plano ${getTitle(ticket.type)}, atualizar cadastro na plataforma em até 48 horas`,
					authorName: session.user.name,
				},
			});
			revalidateTag('user');
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
