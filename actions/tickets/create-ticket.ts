/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { $Enums } from '@prisma/client';
import SendEmailAction from '../email/sendEmail';
import { generateContentNewTicket } from '@/constants/email-contents';

interface CreateTicketProps {
	userId: string;
	type: $Enums.TicketType;
	title: string;
	stripeId?: string;
}

export async function createTicketAction({
	userId,
	type,
	title,
	stripeId,
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
				message: `Usuário ${user.name} solicitou o plano ${type}, fazer cadastro na plataforma em até 48 horas`,
			}),
		});

		await prisma.updates.create({
			data: {
				ticketId: newTicket.id,
				message: `Usuário ${user.name} solicitou o plano ${type}, fazer cadastro na plataforma em até 48 horas`,
				authorName: user.name,
			},
		});

		if (!newTicket) {
			return { success: false, message: 'Plano Não Solicitado' };
		}

		console.log(`Plano ${type} solicitado`);
		//enviar e-mail de confirmação de cadastro
		return { success: true, message: `Plano ${type} solicitado com sucesso` };
	} catch (error) {
		console.log('não solicitado');
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
