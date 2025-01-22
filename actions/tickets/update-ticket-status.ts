/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { $Enums } from '@prisma/client';
import { getServerSession } from 'next-auth';

interface UpdateTicketProps {
	ticketId: string;
	status: $Enums.Status;
}

export async function updateTicketStatusAction({
	ticketId,

	status,
}: UpdateTicketProps) {
	const session = await getServerSession();

	if (!session || !session?.user) {
		return { success: false, message: 'Chamado Não Atualizado', data: null };
	}

	try {
		const newTicket = await prisma.ticket.update({
			where: { id: ticketId },
			data: {
				status: status,
			},
		});

		function getTicketStatus(status: $Enums.Status) {
			if (status === 'COMPLETED') {
				return 'Concluído';
			} else if (status === 'IN_PROGRESS') {
				return 'Em Andamento';
			} else {
				return 'Pendente';
			}
		}

		await prisma.updates.create({
			data: {
				ticketId: newTicket.id,
				message: `Chamado atualizado para ${getTicketStatus(status)}`,
				authorName: session.user.name,
			},
		});

		if (!newTicket) {
			return { success: false, message: 'Plano Não Atualizado', data: null };
		}

		//enviar e-mail de confirmação de cadastro
		return {
			success: true,
			message: `Chamado atualizado para ${status}`,
			data: null,
		};
	} catch (error) {
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			data: null,
		};
	}
}
