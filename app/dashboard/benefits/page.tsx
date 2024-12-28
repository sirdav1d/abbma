/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import BtnReveal from './_components/btn-reveal';

export default async function BenefitsPage() {
	const tickets = await GetAllTicketsAction();

	let newTitle: string;

	tickets?.find((t) => {
		if (t.type == 'CLUB_VANTAGES') {
			return (newTitle = 'CLUBE DE VANTAGENS');
		}
		if (t.type == 'TELEMEDICINE') {
			return (newTitle = 'TELEMEDICINA');
		}
		if (t.type == 'HEALTH_PLAN') {
			return (newTitle = 'SEGUROS E PLANOS DE SAÚDE');
		}
	});

	return (
		<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0'>
			<div className='flex flex-col gap-10'>
				<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
					Meus Benefícios Ativos
				</h2>
				<div className='w-fit grid'>
					{tickets?.map((item, index) => {
						return (
							<Card key={index}>
								<CardHeader>
									<CardTitle>{newTitle}</CardTitle>
									<CardDescription>
										Ao entrar na plataforma parceira, faça login com suas credenciais
										abaixo:
									</CardDescription>
								</CardHeader>
								<CardContent>
									<BtnReveal
										email={'ddavid.diniz@gmail.com'}
										password={'123456'}
									/>
								</CardContent>
								<CardFooter>
									<Button asChild className='w-full'>
										<Link
											target='_blank'
											href={'https://abbma.clubeparcerias.com.br/'}>
											Acessar Plataforma <ArrowRight />
										</Link>
									</Button>{' '}
								</CardFooter>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
