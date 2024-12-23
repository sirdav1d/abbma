/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ScanHeart, Shield, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
	const tickets = await GetAllTicketsAction();

	// const typeTicket: { [key: string]: string } = {
	// 	CLUB_VANTAGES: 'Clube de Vantagens',
	// 	TELEMEDICINE: 'Telemedicina',
	// 	HEALTH_PLAN: 'Planos de Saúde',
	// };

	// const statusTicket: { [key: string]: string } = {
	// 	OPEN: 'Aberto',
	// 	CLOSED: 'Concluído',
	// 	PENDING: 'Em Andamento',
	// };

	const isActivePlanClub = tickets?.find((t) => {
		return t.type == 'CLUB_VANTAGES';
	});

	const isActivePlanTele = tickets?.find((t) => {
		return t.type == 'TELEMEDICINE';
	});

	const isActivePlanSec = tickets?.find((t) => {
		return t.type == 'HEALTH_PLAN';
	});

	return (
		<div className='mx-auto w-full max-w-7xl px-4 md:px-0 mt-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
				Descubra tudo o que a ABBMA pode te oferecer
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-5'>
				<Card>
					<CardHeader>
						<CardTitle className='flex gap-2 items-center text-xl md:text-2xl'>
							<Shield />
							Clube de Vantagens
						</CardTitle>
						<CardDescription>
							O clube de vantagens oferece descontos exclusivos em diversos
							segmentos, incluindo cursos gratuitos em todo o Brasil
						</CardDescription>
					</CardHeader>
					<CardContent className='w-full'>
						{isActivePlanClub?.type === 'CLUB_VANTAGES' && (
							<span className='bg-green-100 rounded-full text-green-800 font-bold px-4 py-2 w-full text-sm'>
								Plano Ativo
							</span>
						)}
					</CardContent>
					<CardFooter className='w-full flex justify-between items-center'>
						<Button variant={'link'}>Ver Detalhes</Button>
						{isActivePlanClub?.type === 'CLUB_VANTAGES' ? (
							<></>
						) : (
							<Button>Quero Contratar</Button>
						)}
					</CardFooter>
				</Card>

				<Card className='opacity-80'>
					<CardHeader>
						<CardTitle className='flex gap-2 items-center text-xl md:text-2xl'>
							<Stethoscope />
							Descontos em Telemedicina
						</CardTitle>
						<CardDescription>
							Com a telemedicina, você tem acesso a atendimento médico em
							qualquer hora do dia, além de poder contar com consultas em
							diversas especialidades
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isActivePlanTele?.type === 'TELEMEDICINE' && (
							<span className='bg-green-100 rounded-full text-green-800 font-bold px-4 py-2 w-full text-sm'>
								Plano Ativo
							</span>
						)}
					</CardContent>
					<CardFooter className='w-full flex justify-between items-center'>
						<Button variant={'link'}>Ver Detalhes</Button>
						{isActivePlanTele?.type === 'TELEMEDICINE' ? (
							<></>
						) : (
							<Button>Quero Contratar</Button>
						)}
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className='flex gap-2 items-center text-xl md:text-2xl'>
							<ScanHeart />
							Seguros e Planos de Saúde
						</CardTitle>
						<CardDescription>
							Proteja o que é mais importante! Conte com vantagens exclusivas em
							diversos Seguros e Planos de Saúdes, garantindo mais tranquilidade
							para você e sua família
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isActivePlanSec?.type === 'HEALTH_PLAN' && (
							<span className='bg-green-100 rounded-full text-green-800 font-bold px-4 py-2 w-full text-sm'>
								Plano Ativo
							</span>
						)}
					</CardContent>
					<CardFooter className='w-full flex justify-between items-center'>
						<Button variant={'link'}>Ver Detalhes</Button>
						{isActivePlanSec?.type === 'HEALTH_PLAN' ? (
							<></>
						) : (
							<Button>Quero Contratar</Button>
						)}
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
