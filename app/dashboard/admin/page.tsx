/** @format */

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { mockTickets } from '../_constants/mockTickets';
import { TicketList } from './_components/ticket-list';
import { TicketStats } from './_components/ticket-status';

// This would typically come from a database or API

export default function AdminPage() {
	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Gerencie as solicitações de seus clientes
			</h2>
			<Card className='mt-10'>
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
					<TicketStats tickets={mockTickets} />
					<TicketList initialTickets={mockTickets} />
				</CardContent>
			</Card>
		</div>
	);
}
