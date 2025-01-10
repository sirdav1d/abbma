/** @format */

import CancelSubModal from '@/components/cancel-sub-modal';
import { Badge } from '@/components/ui/badge';
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
import BtnReveal from './btn-reveal';

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
					<CardTitle className='flex items-center justify-between'>
						{props.ticket?.title}{' '}
						<Badge
							className={`${props.ticket?.status == 'PENDING' && 'bg-orange-600 hover:bg-orange-700'} ${props.ticket?.status == 'CLOSED' && 'bg-blue-500 hover:bg-blue-600'} text-xs`}>
							{props.ticket?.status}
						</Badge>
					</CardTitle>
					<CardDescription>
						Ao entrar na plataforma parceira, faça login com suas credenciais
						abaixo:
					</CardDescription>
				</CardHeader>
				<CardContent>
					<BtnReveal
						email={String(props.ticket?.credential_email)}
						password={String(props.ticket?.credential_pass)}
					/>
				</CardContent>
				<CardFooter className='flex flex-col gap-2'>
					{props.ticket?.type == 'CLUB_VANTAGES' ? (
						<BtnAccessPlatform
							href={'https://abbma.clubeparcerias.com.br/member/login'}
							status={props.ticket?.status}
						/>
					) : (
						<BtnAccessPlatform
							href={'https://medicar.com.br/'}
							status={props.ticket?.status}
						/>
					)}
					{props.ticket.status == 'CLOSED' ? (
						<CancelSubModal
							planName={String(props.ticket?.title)}
							id={String(props.ticket?.id)}
						/>
					) : (
						<></>
					)}
				</CardFooter>
			</Card>
		)
	);
}
