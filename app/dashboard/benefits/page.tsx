/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CardBenefit from './_components/card-benefit';
import CancelSubModal from '@/components/cancel-sub-modal';

export default async function BenefitsPage() {
	const { data, success } = await GetAllTicketsAction({ email: null });

	if (!success || !data) {
		return <div>Nenhum chamado foi encontrado</div>;
	}

	const activeTickets = data.filter((ticket) => ticket.isActive);

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
					{activeTickets?.map((item, index) => {
						return (
							<CardBenefit
								ticket={item}
								key={index}
							/>
						);
					})}
				</div>
				{activeTickets?.length !== 0 && <CancelSubModal />}
			</div>
		</div>
	);
}
