/** @format */

import { Card, CardContent } from '@/components/ui/card';
import { TicketDetailContent } from '../_components/ticket-details-content';
import { Ticket } from '@prisma/client';

export default async function OperatorTicketDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

	const res = await fetch(`${baseUrl}/api/get-ticket-by-id`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(id),
	});

	const { ticket } = await res.json();

	if (!ticket) {
		return (
			<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5 text-muted-foreground'>
				Nenhum chamado foi encontrado
			</div>
		);
	}

	const ticketItem = {
		id: ticket.id,
		number: ticket.number,
		name: ticket.user.name,
		type: ticket.type,
		description: ticket.description,
		status: ticket.status,
		createdAt: ticket.createdAt,
		updates: ticket.Updates.sort(
			(a: Ticket, b: Ticket) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
		),
	};

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Acompanhe os detalhes do chamado
			</h2>
			<Card className='mt-10'>
				<CardContent className='pt-6'>
					<TicketDetailContent Ticket={ticketItem} />
				</CardContent>
			</Card>
		</div>
	);
}
