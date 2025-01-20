/** @format */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TicketCounts = {
	total: number;
	pending: number;
	inProgress: number;
	completed: number;
};

export function TicketStats({ tickets }: { tickets: TicketCounts }) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
			<Card>
				<CardHeader>
					<CardTitle>Total</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold text-blue-500'>{tickets.total}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Pendentes</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold text-yellow-500'>
						{tickets.pending}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Em Andamento</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold '>{tickets.inProgress}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Concluídos</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-2xl font-bold text-green-500'>
						{tickets.completed}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
