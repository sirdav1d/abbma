/** @format */

'use server';

import { generateContentNewTicket } from '@/constants/email-contents';
import { prisma } from '@/lib/prisma';
import { getTitle } from '@/utils/get-title-ticket';
import { $Enums } from '@prisma/client';
import SendEmailAction from '../email/sendEmail';

interface CreateTicketProps {
	userId: string;
	type: $Enums.TicketType;
	title: string;
	stripeId?: string;
	messageUpdates?: string;
}

export async function createTicketAction({
	userId,
	type,
	title,
	stripeId,
	messageUpdates,
}: CreateTicketProps) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	try {
		if (!user) {
			return { success: false, message: 'Usuário não encontrado' };
		}

		const newTicket = await prisma.ticket.create({
			data: {
				userId: userId,
				type: type,
				title: title,
				isActive: true,
				stripeId: stripeId ?? '',
				status: 'PENDING',
			},
		});

		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Novo Plano Contratado',
			htmlContent: generateContentNewTicket({
				name: user.name,
				message: `Usuário ${user.name} solicitou o plano ${getTitle(type)}, fazer cadastro na plataforma em até 48 horas`,
			}),
		});

		await prisma.updates.create({
			data: {
				ticketId: newTicket.id,
				message:
					messageUpdates ??
					`Usuário ${user.name} solicitou o plano ${getTitle(type)}, fazer cadastro na plataforma em até 48 horas`,
				authorName: user.name,
			},
		});

		if (!newTicket) {
			return { success: false, message: 'Plano Não Solicitado' };
		}

		console.log(`Plano ${getTitle(type)} solicitado`);
		//enviar e-mail de confirmação de cadastro
		return {
			success: true,
			message: `Plano ${getTitle(type)} solicitado com sucesso`,
		};
	} catch (error) {
		console.log('não solicitado');
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
