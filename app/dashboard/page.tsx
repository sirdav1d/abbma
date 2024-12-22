/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Shield } from 'lucide-react';
import ModalDetailsTicket from './_components/modal-details-ticket';

export default async function DashboardPage() {
	const tickets = await GetAllTicketsAction();

	const typeTicket: { [key: string]: string } = {
		CLUB_VANTAGES: 'Clube de Vantagens',
		TELEMEDICINE: 'Telemedicina',
		HEALTH_PLAN: 'Planos de Saúde',
	};

	const statusTicket: { [key: string]: string } = {
		OPEN: 'Aberto',
		CLOSED: 'Concluído',
		PENDING: 'Em Andamento',
	};

	return (
		<div className='mx-auto w-full max-w-7xl px-4 md:px-0 mt-5'>
			<h2 className='font-semibold text-xl md:text-2xl'>
				Meus Benefícios Solicitados
			</h2>
			<div className='grid grid-cols-3 mt-10'>
				{tickets?.map((t, index) => {
					const typeT = typeTicket[t.type];
					const statusT = statusTicket[t.status];
					return (
						<Card key={index}>
							<CardHeader>
								<CardTitle className='flex gap-2'>
									<Shield />
									{typeT}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='flex flex-col gap-2'>
									<p>
										<strong>Tarefa:</strong> {t.title}
									</p>
									<p>
										<strong>Status:</strong> {statusT}
									</p>
								</div>
							</CardContent>
							<CardFooter>
								<ModalDetailsTicket
									id={t.id}
									title={t.title}
									description={t.description}
									type={typeT}
									status={statusT}
									createdAt={t.createdAt}
									updatedAt={t.updatedAt}
								/>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
