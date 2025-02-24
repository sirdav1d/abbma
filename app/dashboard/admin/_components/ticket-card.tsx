/** @format */

import React from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Phone, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const benefitTypeIcons = {
	'Clube de Vantagens': Gift,
	Telemedicina: Phone,
};

type Ticket = {
	id: string;
	number: number;
	name: string;
	type: string;
	status: string;
	createdAt: Date;
};

export function TicketCards({ tickets }: { tickets: Ticket[] }) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{tickets.map((ticket) => {
				const BenefitIcon =
					benefitTypeIcons[ticket.type as keyof typeof benefitTypeIcons];
				return (
					<Card key={ticket.id}>
						<CardHeader>
							<CardTitle className='flex justify-between items-center'>
								<span>{`T-000${ticket.number}`}</span>
								<Badge
									variant={
										ticket.status === 'Pendente'
											? 'warning'
											: ticket.status === 'Em Andamento'
												? 'secondary'
												: 'success'
									}>
									{ticket.status === 'Pendente' && (
										<Clock className='mr-1 h-3 w-3' />
									)}
									{ticket.status === 'Em Andamento' && (
										<Clock className='mr-1 h-3 w-3' />
									)}
									{ticket.status === 'Concluído' && (
										<CheckCircle className='mr-1 h-3 w-3' />
									)}
									{ticket.status}
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='font-semibold'>{ticket.name}</p>
							<div className='flex items-center mt-2'>
								{BenefitIcon && <BenefitIcon className='mr-2 h-4 w-4' />}
								<span>{ticket.type}</span>
							</div>
							<p className='text-sm text-gray-500 mt-2'>
								Aberto em:{' '}
								{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
							</p>
						</CardContent>
						<CardFooter>
							<Button
								variant='link'
								asChild
								className='w-full'>
								<Link href={`/dashboard/admin/${ticket.id}`}>Ver Detalhes</Link>
							</Button>
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
}
