/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { $Enums } from '@prisma/client';

interface UpdateTicketProps {
	userId: string;
	type: $Enums.TicketType;
	title?: string;
	ticketId: string;
	status?: $Enums.Status;
}

function getTitle(type: $Enums.TicketType) {
	if (type == 'CLUB_VANTAGES') {
		return 'Clube de Vantagens';
	}

	if (type == 'TELEMEDICINE_INDIVIDUAL') {
		return 'Telemedicina Individual';
	}

	if (type == 'TELEMEDICINE_COUPLE') {
		return 'Telemedicina Casal';
	}
	if (type == 'TELEMEDICINE_FAMILY') {
		return 'Telemedicina Família';
	}
}

export async function updateTicketAction({
	userId,
	type,
	ticketId,
	title,
	status
}: UpdateTicketProps) {
	const credentialPassword = Math.random().toString(36).slice(2);

	const newTitle = getTitle(type);
	const user = await prisma.user.findUnique({
		where: { id: userId },
	});


	if (!user) {
		return { success: false, message: 'Usuário não encontrado' };
	}
	try {
		const newTicket = await prisma.ticket.update({
			where: { id: ticketId },
			data: {
				userId: userId,
				type: type,
				title: title ?? newTitle,
				credential_email: user?.email,
				credential_pass: credentialPassword,
				status: status ?? 'PENDING',
			},
		});

		await prisma.updates.create({
			data: {
				ticketId: newTicket.id,
				message: `Usuário ${user.name} solicitou o plano ${type}, cadastrar suas credenciais ${credentialPassword} e ${user.email} na plataforma`,
				authorName: user.name

			}
		})

		if (!newTicket) {
			return { success: false, message: 'Plano Não Atualizado' };
		}

		console.log(`Plano ${type} Atualizado`);
		//enviar e-mail de confirmação de cadastro
		return { success: true, message: `Plano ${type} atualizado com sucesso` };
	} catch (error) {
		console.log('não atualizado');
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
