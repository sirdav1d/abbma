/** @format */

import GetTicketByIdAction from '@/actions/tickets/get-ticket-by-id';
import { Card, CardContent } from '@/components/ui/card';
import { TicketDetailContent } from '../_components/ticket-details-content';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function OperatorTicketDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const { data } = await GetTicketByIdAction(id);
	const session = await getServerSession();

	if (!session) {
		redirect('/login');
	}

	if (!data) {
		return <div>Chamado não encontrado</div>;
	}
	const ticketItem = {
		id: data?.id,
		number: data?.number,
		name: data?.user.name,
		type: data?.type,
		description: data?.description,
		status: data?.status,
		createdAt: data?.createdAt,
		updates: data?.Updates.sort(
			(a, b) =>
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
