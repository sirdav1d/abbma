/** @format */

import { createTicketAction } from '@/actions/tickets/create-ticket';
import { $Enums, Ticket, User } from '@prisma/client';
import { getTitle } from '../get-title-ticket';

export async function manageTickets(
	user: User,
	tickets?: Ticket[] | null,
	priceType?: $Enums.TicketType,
) {
	try {
		if (tickets?.length == 0 && priceType == 'CLUB_VANTAGES') {
			const resp = await createTicketAction({
				userId: user.id,
				type: priceType,
				title: `${getTitle(priceType)}`,
				messageUpdates: `Cliente ${user.name} solicitou o plano ${getTitle(priceType)}, cadastrar suas credenciais na plataforma parceira em até 48 horas`,
				
			});
			return resp;
		}

		if (tickets?.length == 0 && priceType !== 'CLUB_VANTAGES' && priceType) {
			const resp = await createTicketAction({
				userId: user.id,
				type: priceType,
				title: `${getTitle(priceType)}`,
				messageUpdates: `Cliente ${user.name} solicitou o plano ${getTitle(priceType)}, cadastrar suas credenciais na plataforma parceira em até 48 horas`,
			});

			const resp2 = await createTicketAction({
				userId: user.id,
				type: 'CLUB_VANTAGES',
				title: `Clube de Vantagens`,
				messageUpdates: `Cliente ${user.name} solicitou o plano Clube de Vantagens, cadastrar suas credenciais na plataforma parceira em até 48 horas`,
			});

			return [resp, resp2];
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
