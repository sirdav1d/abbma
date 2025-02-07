/** @format */

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

// import { mockTickets } from '../_constants/mockTickets';
import { Ticket } from '@prisma/client';
import { TicketList } from './_components/ticket-list';
import { TicketStats } from './_components/ticket-status';

// This would typically come from a database or API

export default async function AdminPage() {
	const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

	const res = await fetch(`${baseUrl}/api/get-all-tickets`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const { tickets } = await res.json();

	if (!tickets) {
		return (
			<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5 text-muted-foreground'>
				Nenhum chamado foi encontrado
			</div>
		);
	}

	const ticketCounts = {
		total: tickets.length,
		pending: tickets.filter((t: Ticket) => t.status === 'PENDING').length,
		inProgress: tickets.filter((t: Ticket) => t.status === 'IN_PROGRESS')
			.length,
		completed: tickets.filter((t: Ticket) => t.status === 'COMPLETED').length,
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ticketItems = tickets.map((ticket: any) => {
		return {
			id: ticket.id,
			number: ticket.number,
			name: ticket.user.name,
			userId: ticket.userId,
			type:
				ticket.type == 'CLUB_VANTAGES'
					? 'Clube de Vantagens'
					: ticket.type == 'HEALTH_PLAN'
						? 'Plano de Saúde'
						: 'Telemedicina',
			status:
				ticket.status == 'PENDING'
					? 'Pendente'
					: ticket.status == 'IN_PROGRESS'
						? 'Em Andamento'
						: 'Concluído',
			createdAt: ticket.createdAt,
		};
	});

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<Card className='mt-0'>
				<CardHeader>
					<div className='flex flex-col md:flex-row gap-5 justify-between items-center'>
						<div>
							<CardTitle className='text-2xl font-bold'>
								Gerenciamento de Chamados
							</CardTitle>
							<CardDescription>
								Visualize e gerencie os chamados de suporte
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<TicketStats tickets={ticketCounts} />
					<TicketList initialTickets={ticketItems} />
				</CardContent>
			</Card>
		</div>
	);
}
