/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import SendEmailAction from '../email/sendEmail';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { generateContentDeleteDependent } from '@/constants/email-contents';
import GetAllTicketsAction from '../tickets/get-all-tickets';
import { getTitle } from '@/utils/get-title-ticket';
import { revalidatePath } from 'next/cache';

export async function deleteDependentAction(id: string) {
	const session = await getServerSession();
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
			revalidatePath('/dashboard/dependents');
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
