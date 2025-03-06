/** @format */

import { createTicketAction } from '@/actions/tickets/create-ticket';
import { updateTicketAction } from '@/actions/tickets/update-ticket';
import { $Enums, Ticket, User } from '@prisma/client';
import { getTitle } from '../get-title-ticket';

export async function manageTickets(
	user: User,
	tickets?: Ticket[] | null,
	priceType?: $Enums.TicketType,
) {
	try {
		const existingTicket = tickets?.find(
			(ticket) => ticket.type !== 'CLUB_VANTAGES',
		);

		if (existingTicket?.type === priceType && priceType) {
			await createTicketAction({
				userId: user.id,
				type: priceType,
				title: String(`Dependente -${getTitle(priceType)}`),
				messageUpdates: `Cliente ${user.name} solicitou a adição de um novo dependente no seu plano ${getTitle(priceType)}`,
			});

			console.log('Tickets Dependente-createTicketAction');
		}

		if (existingTicket && priceType && existingTicket?.type !== priceType) {
			await updateTicketAction({
				ticketId: existingTicket.id,
				userId: user.id,
				type: priceType,
			});
			console.log('Tickets updateTicketAction');
			return {
				ok: true,
				message: `${user.name} atualizou seu plano ${getTitle(priceType)}`,
			};
		}

		if (tickets?.length == 0 && priceType == 'CLUB_VANTAGES') {
			await createTicketAction({
				userId: user.id,
				type: priceType,
				title: `${getTitle(priceType)}`,
				messageUpdates: `Cliente ${user.name} solicitou o plano ${getTitle(priceType)}, cadastrar suas credenciais na plataforma parceira em até 48 horas`,
			});
			return {
				ok: true,
				message: `${user.name} solicitou seu plano ${getTitle(priceType)}`,
			};
		}

		if (tickets?.length == 0 && priceType !== 'CLUB_VANTAGES' && priceType) {
			await createTicketAction({
				userId: user.id,
				type: priceType,
				title: `${getTitle(priceType)}`,
				messageUpdates: `Cliente ${user.name} solicitou o plano ${getTitle(priceType)}, cadastrar suas credenciais na plataforma parceira em até 48 horas`,
			});

			await createTicketAction({
				userId: user.id,
				type: 'CLUB_VANTAGES',
				title: `Clube de Vantagens`,
				messageUpdates: `Cliente ${user.name} solicitou o plano Clube de Vantagens, cadastrar suas credenciais na plataforma parceira em até 48 horas`,
			});

			return {
				ok: true,
				message: `${user.name} solicitou seu plano ${getTitle(priceType)} e ganhou o Clube de Vantagens`,
			};
		}

		return {
			ok: false,
			message: `nenhum evento compatível -  ${tickets?.length} ${user.email} ${priceType}`,
		};
	} catch (error) {
		console.log('algo deu errado' + error);
		return { ok: false, message: error };
	}
}
