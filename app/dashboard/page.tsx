/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { Badge } from '@/components/ui/badge';
import { BorderTrail } from '@/components/ui/border-trail';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { teleCouple, teleFamily, teleIndividual } from '@/constants/tele-plans';
import { ArrowRight, CircleCheckBig, CircleSlash2 } from 'lucide-react';
import Link from 'next/link';
import { benefits } from './_constants/benefits';
import { getServerSession } from 'next-auth';
import BuyButton from '@/components/buy-button';

export default async function DashboardPage() {
	const tickets = await GetAllTicketsAction();
	const session = await getServerSession();

	const isActivePlan = tickets?.find((t) => {
		if (t.type == 'CLUB_VANTAGES') {
			return 'CLUB_VANTAGES';
		}
		if (t.type == 'TELEMEDICINE') {
			return 'TELEMEDICINE';
		}
		if (t.type == 'HEALTH_PLAN') {
			return 'HEALTH_PLAN';
		}
	});

	return (
		<div className='mx-auto w-full max-w-7xl px-4 2xl:px-0  py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
				Descubra tudo o que a ABBMA pode te oferecer
			</h2>
			<div className=' mt-10 gap-5'>
				<Tabs
					defaultValue={benefits[0].id}
					className='w-full'>
					<TabsList className='grid w-full grid-cols-3 gap-2'>
						{benefits.map((benefit) => (
							<TabsTrigger
								key={benefit.id}
								value={benefit.id}
								className='text-sm md:text-base'>
								<benefit.icon className='h-6 w-6 mr-2' />
								<span className='hidden md:inline'>{benefit.title}</span>
							</TabsTrigger>
						))}
					</TabsList>
					{benefits.map((benefit) => (
						<TabsContent
							key={benefit.id}
							value={benefit.id}>
							<Card>
								<CardHeader>
									<div className='flex items-center justify-between'>
										<div className='flex md:items-center flex-col gap-2 md:flex-row'>
											<benefit.icon className='h-6 w-6 mr-2' />
											<CardTitle>{benefit.title}</CardTitle>
										</div>
										{isActivePlan && isActivePlan.type == benefit.id ? (
											<Badge className='scale-110'>Ativo</Badge>
										) : (
											<Badge variant={'outline'}>Inativo</Badge>
										)}
									</div>
									<CardDescription className='text-balance'>
										{benefit.content}
									</CardDescription>
								</CardHeader>
								<CardContent className='flex flex-col gap-8'>
									<ul className='grid grid-cols-1 md:grid-cols-3  justify-between gap-4 w-full '>
										{benefit?.item_benefits?.map((item, index) => {
											return (
												<li
													key={index}
													className='flex w-full justify-start gap-2 items-center text-slate-700 '>
													<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
													<span className=' text-sm w-full'>{item}</span>
												</li>
											);
										})}
									</ul>
								</CardContent>
								<CardFooter className='flex items-center gap-5 w-full justify-between'>
									{isActivePlan && isActivePlan.type == benefit.id ? (
										<Button
											variant={'link'}
											className='w-full md:w-fit'
											asChild>
											<Link href={'/dashboard/benefits'}>
												Verificar meu benefício
												<ArrowRight className='h-4 w-4' />
											</Link>
										</Button>
									) : (
										<div className='flex'>
											{session?.user && benefit.id === 'CLUB_VANTAGES' && (
												<BuyButton
													priceType='tele_individual'
													size='default'
													email={session?.user?.email}
													cpf={String(session?.user?.cpf)}
												/>
											)}

											<Button
												variant={'link'}
												className='w-full md:w-fit'
												asChild>
												<Link
													href={`https://wa.me/5521986508882?text=Ol%C3%A1%2C%20estava%20navegando%20no%20seu%20site%20e%20preciso%20de%20ajuda%20com%20${benefit.title}`}
													target='_blank'
													rel='noopener noreferrer'>
													Falar Com Consultor <ArrowRight className='h-4 w-4' />
												</Link>
											</Button>
										</div>
									)}
								</CardFooter>
							</Card>

							<Separator className='my-4' />

							{benefit.id == 'TELEMEDICINE' && (
								<div className='grid grid-cols-1 xl:grid-cols-3 w-full mt-5 gap-5'>
									<Card>
										<CardHeader>
											<CardTitle className='font-bold text-xl'>
												R$24,99
											</CardTitle>
											<CardDescription>
												PLANO INDIVIDUAL + CLUBE DE VANTAGENS
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-3'>
												{teleIndividual.habiltado.map((item, index) => {
													return (
														<li
															key={index}
															className='flex w-full justify-start gap-2 items-center text-slate-700 '>
															<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
															<span className=' text-sm w-full'>{item}</span>
														</li>
													);
												})}
												{teleIndividual.inabilitado.map((item, index) => {
													return (
														<li
															key={index}
															className='flex w-full justify-start gap-2 items-center text-slate-700 '>
															<CircleSlash2 className='text-red-500 w-5 h-5 size-full' />
															<span className=' text-sm w-full'>{item}</span>
														</li>
													);
												})}
											</ul>
										</CardContent>
										<CardFooter>
											<Button className='w-full'>
												Contratar Plano <ArrowRight />
											</Button>
										</CardFooter>
									</Card>
									<Card className='relative border-none'>
										<BorderTrail
											style={{
												boxShadow:
													'0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(59 130 246 / 100%), 0 0 140px 90px rgb(96 165 250 / 50%)',
											}}
											size={100}
										/>
										<CardHeader>
											<CardTitle className='font-bold text-xl'>
												R$44,99
											</CardTitle>
											<CardDescription>
												PLANO CASAL + CLUBE DE VANTAGENS
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-3'>
												{teleCouple.habiltado.map((item, index) => {
													return (
														<li
															key={index}
															className='flex w-full justify-start gap-2 items-center text-slate-700 '>
															<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
															<span className=' text-sm w-full'>{item}</span>
														</li>
													);
												})}
											</ul>
										</CardContent>
										<CardFooter>
											<Button className='w-full'>
												Contratar Plano <ArrowRight />
											</Button>
										</CardFooter>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle className='font-bold text-xl'>
												R$79,99
											</CardTitle>
											<CardDescription>
												PLANO FAMÍLIA + CLUBE DE VANTAGENS
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-3'>
												{teleFamily.habiltado.map((item, index) => {
													return (
														<li
															key={index}
															className='flex w-full justify-start gap-2 items-center text-slate-700 '>
															<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
															<span className=' text-sm w-full'>{item}</span>
														</li>
													);
												})}
											</ul>
										</CardContent>
										<CardFooter>
											<Button className='w-full'>
												Contratar Plano <ArrowRight />
											</Button>
										</CardFooter>
									</Card>
								</div>
							)}
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
}
