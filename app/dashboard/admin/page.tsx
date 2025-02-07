/** @format */

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

// import { mockTickets } from '../_constants/mockTickets';
import GetAllTicketsCustomAction from '@/actions/tickets/get-all-custom';
import { TicketList } from './_components/ticket-list';
import { TicketStats } from './_components/ticket-status';

// This would typically come from a database or API

export default async function AdminPage() {
	const data = await GetAllTicketsCustomAction();
	const tickets = data.data;

	if (!tickets) {
		return <div>Nenhum chamado foi encontrado</div>;
	}

	const ticketCounts = {
		total: tickets.length,
		pending: tickets.filter((t) => t.status === 'PENDING').length,
		inProgress: tickets.filter((t) => t.status === 'IN_PROGRESS').length,
		completed: tickets.filter((t) => t.status === 'COMPLETED').length,
	};

	const ticketItems = tickets.map((ticket) => {
		return {
			id: ticket.id,
			number: ticket.number,
			name: ticket.user.name,
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
			{/* <h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Gerencie as solicitações de seus clientes
			</h2> */}
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
