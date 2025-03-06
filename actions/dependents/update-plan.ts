/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { getTitle } from '@/utils/get-title-ticket';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { createTicketAction } from '../tickets/create-ticket';
import { updateTicketAction } from '../tickets/update-ticket';

interface UpdateDependentProps {
	plan: 'TELEMEDICINE_INDIVIDUAL' | 'CLUB_VANTAGES';
	id: string;
}

export async function updatePlanDependentAction({
	plan,
	id,
}: UpdateDependentProps) {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}

	try {
		const dependent = await prisma.dependent.findUnique({
			where: { id: id },
		});

		if (!dependent) {
			return {
				success: false,
				message: `Dependente não encontrado no banco de dados`,
				newTicket: null,
			};
		}

		const title = getTitle(plan);

		let newTicket;
		if (!dependent.ticketId) {
			newTicket = await createTicketAction({
				userId: id,
				type: plan,
				title: title!,
				isDependent: true,
			});
			if (!newTicket.data) {
				return {
					success: false,
					message: `Não foi possível associar o plano ao dependente`,
					newTicket: null,
				};
			}
			await prisma.dependent.update({
				where: { id: id },
				data: { ticketId: newTicket.data.id },
			});
			return {
				success: true,
				message: `Plano ${newTicket.data.title} assiociado ao dependente`,
				newTicket: newTicket,
			};
		} else {
			newTicket = await updateTicketAction({
				userId: id,
				type: plan,
				title: title!,
				ticketId: dependent.ticketId,
				isDependent: true,
			});
			return {
				success: true,
				message: `Plano ${getTitle(plan)} assiociado ao dependente`,
				newTicket: newTicket,
			};
		}
	} catch (error) {
		console.log('não atualizado', error);
		return {
			success: false,
			message: `Algo deu errado`,
			newTicket: null,
		};
	}
}
