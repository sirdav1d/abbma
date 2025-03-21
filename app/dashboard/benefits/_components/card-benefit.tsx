/** @format */

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Ticket } from '@prisma/client';
import BtnAccessPlatform from './btn-access-platform';

interface CardBenefitProps {
	ticket?: Ticket;
}

export default function CardBenefit(props: CardBenefitProps) {
	return (
		props.ticket && (
			<Card
				key={props.ticket?.id}
				className='w-full max-w-sm md:max-w-full'>
				<CardHeader>
					<CardTitle className='flex flex-col-reverse md:flex-row gap-3 md:items-center justify-between'>
						{props.ticket?.title}{' '}
						<Badge
							className={`${props.ticket?.status == 'PENDING' && 'bg-yellow-600 hover:bg-yellow-700'} ${props.ticket?.status == 'COMPLETED' && 'bg-green-500 hover:bg-green-600'} text-xs w-fit`}>
							{props.ticket?.status == 'PENDING'
								? 'Pendente'
								: props.ticket?.status == 'COMPLETED'
									? 'Concluído'
									: 'Em Andamento'}
						</Badge>
					</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent></CardContent>
				<CardFooter className='flex flex-col gap-2'>
					{props.ticket?.type == 'CLUB_VANTAGES' ? (
						<BtnAccessPlatform
							href={'https://abbma.clubeparcerias.com.br/member/register'}
							status={props.ticket?.status}
						/>
					) : (
						<div className='flex gap-5 flex-col md:flex-row w-full'>
							<BtnAccessPlatform
								href={'https://telemedicina.medicar.com.br/'}
								status={props.ticket?.status}
							/>
							<BtnAccessPlatform
								text='Acessar Aplicativo'
								href={
									'https://play.google.com/store/apps/details?id=br.com.medicar.telemedicina&hl=pt_BR'
								}
								status={props.ticket?.status}
							/>
						</div>
					)}
					{props.ticket.status == 'PENDING' && (
						<Button
							variant={'ghost'}
							className='w-full cursor-not-allowed'>
							Estamos Liberando Seu Acesso em até 48hrs
						</Button>
					)}
				</CardFooter>
			</Card>
		)
	);
}
