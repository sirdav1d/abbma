/** @format */

'use server';

import { generateContentDeleteTicket } from '@/constants/email-contents';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { getTitle } from '@/utils/get-title-ticket';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import SendEmailAction from '../email/sendEmail';

export default async function deleteTicketsAction({ id }: { id: string }) {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}
	try {
		const ticket = await prisma.ticket.update({
			where: { id: id },
			data: {
				isActive: false,
				status: 'PENDING',
			},
		});

		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Cliente Solicita Cancelamento de Plano',
			htmlContent: generateContentDeleteTicket({
				name: session.user.name,
				ticketName: ticket.title,
				message: `Cliente ${session.user.name} solicitou o cancelamento do plano, remover das plataformas parceiras`,
			}),
		});

		await prisma.updates.create({
			data: {
				ticketId: ticket.id,
				message: `Cliente ${session.user.name} solicitou o cancelamento do plano ${getTitle(ticket.type)}`,
				authorName: session.user.name,
			},
		});

		revalidateTag('user-by-email');
		return { ok: true, message: `Plano ${ticket.title} deletado com sucesso` };
	} catch (error) {
		return {
			ok: false,
			message: `Algo deu errado - ${error}`,
		};
	}
}
