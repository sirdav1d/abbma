/** @format */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Ticket = {
	id: number;
	number: string;
	clientName: string;
	benefitType: string;
	status: string;
	openDate: string;
};

export function TicketStats({ tickets }: { tickets: Ticket[] }) {
	const ticketCounts = {
		total: tickets.length,
		pending: tickets.filter((t) => t.status === 'Pendente').length,
		inProgress: tickets.filter((t) => t.status === 'Em Andamento').length,
		completed: tickets.filter((t) => t.status === 'Concluído').length,
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
			<Card>
				<CardHeader>
					<CardTitle>Total</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold text-blue-500'>
						{ticketCounts.total}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Pendentes</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold text-yellow-500'>
						{ticketCounts.pending}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Em Andamento</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold '>{ticketCounts.inProgress}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Concluídos</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold text-green-500'>
						{ticketCounts.completed}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
