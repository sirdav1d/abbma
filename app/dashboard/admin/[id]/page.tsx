/** @format */

import { Card, CardContent } from '@/components/ui/card';
import { TicketDetailContent } from '../_components/ticket-details-content';
import { mockTicket } from '../../_constants/mockTicket';

export default function OperatorTicketDetailPage() {
	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Acompanhe os detalhes do chamado
			</h2>
			<Card className='mt-10'>
				<CardContent className='pt-6'>
					<TicketDetailContent initialTicket={mockTicket} />
				</CardContent>
			</Card>
		</div>
	);
}
