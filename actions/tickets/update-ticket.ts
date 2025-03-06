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
	isDependent?: boolean;
	quantity?: number;
}

export async function updateTicketAction({
	userId,
	type,
	ticketId,
	title,
	status,
	isDependent,
	quantity,
}: UpdateTicketProps) {
	const newTitle = getTitle(type!);

	try {
		if (!isDependent) {
			const user = await prisma.user.findUnique({
				where: { id: userId },
			});

			if (!user) {
				return { success: false, message: 'Usuário não encontrado' };
			}
			const newTicket = await prisma.ticket.update({
				where: { id: ticketId },
				data: {
					userId: userId,
					type: type,
					title: title ?? newTitle,
					status: status ?? 'PENDING',
					quantity: quantity,
				},
			});
			await prisma.updates.create({
				data: {
					ticketId: newTicket.id,
					message: `Cliente ${user.name} atualizou/alterou o plano ${getTitle(type!)}, atualizar na plataforma parceira, caso necessário em até 48 horas`,
					authorName: user.name,
				},
			});
			if (!newTicket) {
				return { success: false, message: 'Plano Não Atualizado' };
			}
			revalidateTag('user-by-email');
			//enviar e-mail de confirmação de cadastro
			return { success: true, message: `Plano ${type} atualizado com sucesso` };
		} else {
			const dependent = await prisma.dependent.findUnique({
				where: { id: userId },
			});
			if (!dependent) {
				return { success: false, message: 'Dependente não encontrado' };
			}
			const newTicket = await prisma.ticket.update({
				where: { id: ticketId },
				data: {
					dependentId: userId,
					type: type,
					title: title ?? newTitle,
					status: status ?? 'PENDING',
				},
			});

			await prisma.updates.create({
				data: {
					ticketId: newTicket.id,
					message: `Dependente ${dependent.name} atualizou/alterou o plano ${getTitle(type!)}, atualizar na plataforma parceira, caso necessário em até 48 horas`,
					authorName: dependent.name,
				},
			});
			if (!newTicket) {
				return { success: false, message: 'Plano Não Atualizado' };
			}
			revalidateTag('user-by-email');
			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: `Plano ${type} atualizado com sucesso`,
			};
		}
	} catch (error) {
		console.log('não atualizado');
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
