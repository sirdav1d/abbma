/** @format */

// import { mockTickets } from '../_constants/mockTickets';
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
		// next: { revalidate: 120 },
	});

	const { tickets, ticketCounts } = await res.json();

	if (!tickets) {
		return (
			<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5 text-muted-foreground'>
				Nenhum chamado foi encontrado
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<div className='flex flex-col md:flex-row gap-5 justify-between items-center'>
				<div className='pb-2'>
					<h2 className='text-2xl font-bold'>Gerenciamento de Chamados</h2>
					<p className='text-muted-foreground'>
						Visualize e gerencie os chamados de suporte
					</p>
				</div>
			</div>

			<div className='pb-5'>
				<TicketStats tickets={ticketCounts} />
				<TicketList initialTickets={tickets} />
			</div>
		</div>
	);
}
