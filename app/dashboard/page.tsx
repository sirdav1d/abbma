/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import BuyButton from '@/components/buy-button';
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
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const tickets = await GetAllTicketsAction({ email: session.user.email });

	const activeTickets = tickets.data?.filter((item) => item.isActive);

	const benefitTypeMapping: Record<string, string> = {
		TELEMEDICINE_INDIVIDUAL: 'TELEMEDICINE',
		TELEMEDICINE_COUPLE: 'TELEMEDICINE',
		TELEMEDICINE_FAMILY: 'TELEMEDICINE',
	};

	const activeTicketTypes =
		activeTickets?.map((ticket) => {
			// Mapear o tipo do ticket para a categoria principal, se aplicável
			return benefitTypeMapping[ticket.type] || ticket.type;
		}) || [];

	const activeTicketTypesUp =
		activeTickets?.map((ticket) => {
			// Mapear o tipo do ticket para a categoria principal, se aplicável
			return ticket.type;
		}) || [];

	return (
		<div className='mx-auto w-full max-w-7xl px-4 2xl:px-0  py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
				Descubra tudo o que a ABBMA pode te oferecer
			</h2>
			<div className=' mt-10 gap-5'>
				<Tabs
					defaultValue={benefits[0].id}
					className='w-full'>
					<TabsList className='grid w-full grid-cols-2 gap-2'>
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
					{benefits.map((benefit) => {
						const isActive = activeTicketTypes.includes(benefit.id);

						return (
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
										{isActive ? (
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
												{benefit.id === 'CLUB_VANTAGES' && (
													<BuyButton
														isAddOn={
															activeTickets?.length && activeTickets?.length > 0
																? true
																: false
														}
														priceType='CLUB_VANTAGES'
														size='default'
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
														Falar Com Consultor{' '}
														<ArrowRight className='h-4 w-4' />
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
												{isActive &&
												activeTicketTypesUp.includes(
													'TELEMEDICINE_INDIVIDUAL',
												) ? (
													<Button
														variant={'link'}
														className='w-full md:w-fit'
														asChild>
														<Link
															href={'/dashboard/benefits'}
															prefetch={false}>
															Verificar meu benefício
															<ArrowRight className='h-4 w-4' />
														</Link>
													</Button>
												) : (
													<BuyButton
														isAddOn={
															activeTickets?.length && activeTickets?.length > 0
																? true
																: false
														}
														size='default'
														priceType={'TELEMEDICINE_INDIVIDUAL'}
													/>
												)}
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
												<CardTitle className='font-bold text-xl relative'>
													R$44,99{' '}
													<span className='absolute bg-gradient-to-r from-blue-600 to-blue-800 w-fit p-3 font-normal h-fit text-sm text-white -top-10 -right-5 rounded-lg'>
														R$22,49 por pessoa
													</span>
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
											<CardFooter className='flex-col gap-5'>
												{isActive &&
												activeTicketTypesUp.includes('TELEMEDICINE_COUPLE') ? (
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
													<BuyButton
														isAddOn={
															activeTickets?.length && activeTickets?.length > 0
																? true
																: false
														}
														size='default'
														priceType={'TELEMEDICINE_COUPLE'}
													/>
												)}
												<a
													href='/dashboard/dependents'
													className=' text-sm w-full text-center hover:underline'>
													É necessário cadastrar o dependente após a contratação
													do plano
												</a>
											</CardFooter>
										</Card>
										<Card>
											<CardHeader>
												<CardTitle className='font-bold text-xl relative'>
													R$79,99{' '}
													<span className='absolute bg-gradient-to-r from-blue-600 to-blue-800 w-fit p-3 font-normal h-fit text-sm text-white -top-10 -right-5 rounded-lg'>
														R$19,49 por pessoa
													</span>
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
											<CardFooter className='flex-col gap-5'>
												{isActive &&
												activeTicketTypesUp.includes('TELEMEDICINE_FAMILY') ? (
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
													<BuyButton
														isAddOn={
															activeTickets?.length && activeTickets?.length > 0
																? true
																: false
														}
														size='default'
														priceType={'TELEMEDICINE_FAMILY'}
													/>
												)}

												<a
													href='/dashboard/dependents'
													className=' text-sm w-full text-center hover:underline'>
													É necessário cadastrar os dependentes após a
													contratação do plano
												</a>
											</CardFooter>
										</Card>
									</div>
								)}
							</TabsContent>
						);
					})}
				</Tabs>
			</div>
		</div>
	);
}
