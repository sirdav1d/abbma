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
import { Separator } from '@/components/ui/separator';

export default async function BenefitsPage() {
	const tickets = await GetAllTicketsAction();

	return (
		<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5'>
			<div className='flex flex-col gap-10'>
				<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
					Meus Benefícios Ativos
				</h2>
				{tickets?.length === 0 && (
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
				<div className='w-fit grid md:grid-cols-2 gap-5'>
					{tickets?.map((item, index) => {
						return (
							<Card key={index}>
								<CardHeader>
									<CardTitle>{item.title}</CardTitle>
									<CardDescription>
										Ao entrar na plataforma parceira, faça login com suas
										credenciais abaixo:
									</CardDescription>
								</CardHeader>
								<CardContent>
									<BtnReveal
										email={item.credential_email!}
										password={item.credential_pass!}
									/>
								</CardContent>
								<CardFooter>
									{item.type == 'CLUB_VANTAGES' ? (
										<Button
											asChild
											className='w-full'>
											<Link
												target='_blank'
												href={'https://abbma.clubeparcerias.com.br/'}>
												Acessar Plataforma <ArrowRight />
											</Link>
										</Button>
									) : (
										<Button
											asChild
											className='w-full'>
											<Link
												target='_blank'
												href={'https://medicar.com.br/'}>
												Acessar Plataforma <ArrowRight />
											</Link>
										</Button>
									)}
								</CardFooter>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
