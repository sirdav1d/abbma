/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { getTitle } from '@/utils/get-title-ticket';
import { $Enums } from '@prisma/client';
import { revalidateTag } from 'next/cache';

interface UpdateTicketProps {
	userId: string;
	type?: $Enums.TicketType;
	title?: string;
	ticketId: string;
	status?: $Enums.Status;
}

export async function updateTicketAction({
	userId,
	type,
	ticketId,
	title,
	status,
}: UpdateTicketProps) {
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
				status: status ?? 'PENDING',
			},
		});

		await prisma.updates.create({
			data: {
				ticketId: newTicket.id,
				message: `Cliente ${user.name} atualizou/alterou o plano ${getTitle(type)}, atualizar na plataforma parceira, caso necessário em até 48 horas`,
				authorName: user.name,
			},
		});

		if (!newTicket) {
			return { success: false, message: 'Plano Não Atualizado' };
		}

		revalidateTag('user-by-email');

		console.log(`Plano ${type} Atualizado`);
		//enviar e-mail de confirmação de cadastro
		return { success: true, message: `Plano ${type} atualizado com sucesso` };
	} catch (error) {
		console.log('não atualizado');
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
