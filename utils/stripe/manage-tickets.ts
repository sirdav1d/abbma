/** @format */
'use server'


import { createTicketAction } from '@/actions/tickets/create-ticket';
import { updateTicketAction } from '@/actions/tickets/update-ticket';
import { $Enums, Ticket, User } from '@prisma/client';

export async function manageTickets(
	user: User,
	tickets: Ticket[],
	priceType: $Enums.TicketType,
) {
	if (!user) return;

	const titleMap = {
		TELEMEDICINE_INDIVIDUAL: 'Telemedicina Individual',
		TELEMEDICINE_COUPLE: 'Telemedicina Casal',
		TELEMEDICINE_FAMILY: 'Telemedicina Família',
	};

	const existingTicket = tickets?.find(
		(ticket) => ticket.type !== 'CLUB_VANTAGES',
	);

	if (existingTicket?.type === priceType) {
		await createTicketAction({
			userId: user.id,
			type: priceType,
			title: String(
				`Dependente - ${titleMap[priceType as keyof typeof titleMap]}`,
			),
			messageUpdates: `Cliente ${user.name} solicitou a adição de um novo dependente no seu plano ${titleMap[priceType as keyof typeof titleMap]}`,
		});
	}

	if (existingTicket && existingTicket?.type !== priceType) {
		await updateTicketAction({
			ticketId: existingTicket.id,
			userId: user.id,
			type: priceType,
		});
	}

	console.log('Tickets managed');
}
