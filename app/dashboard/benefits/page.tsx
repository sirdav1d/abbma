/** @format */

import CancelSubModal from '@/components/cancel-sub-modal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Ticket } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CardBenefit from './_components/card-benefit';

export default async function BenefitsPage() {
	const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

	const res = await fetch(`${baseUrl}/api/get-user-by-email`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		next: { tags: ['user'], revalidate: 3600 },
	});

	const data = await res.json();

	if (!data.success) {
		return (
			<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5 text-muted-foreground'>
				Nenhum chamado foi encontrado
			</div>
		);
	}

	const activeTickets = data.user.tickets.filter(
		(ticket: Ticket) => ticket.isActive,
	);

	return (
		<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5'>
			<div className='flex flex-col gap-10'>
				<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
					Meus Benefícios Ativos
				</h2>
				{activeTickets?.length === 0 && (
					<div className='flex flex-col items-center justify-center gap-5 w-full'>
						<h3 className='text-muted-foreground'>
							Você não possui benefícios ativos
						</h3>
						<Button
							asChild
							variant={'link'}>
							<Link href={'/dashboard'}>
								Ver Benefícios Disponíveis <ArrowRight />
							</Link>
						</Button>
						<Separator className='my-5' />
					</div>
				)}
				<div className='w-full grid grid-cols-1 mx-auto md:grid-cols-2 gap-5'>
					{activeTickets?.map((item: Ticket, index: number) => {
						return (
							<CardBenefit
								ticket={item}
								key={index}
							/>
						);
					})}
				</div>
				{activeTickets?.length > 0 && (
					<CancelSubModal tickets={activeTickets} />
				)}
			</div>
		</div>
	);
}
