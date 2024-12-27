/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import { benefits } from './_constants/benefits';

export default async function DashboardPage() {
	const tickets = await GetAllTicketsAction();

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
											</Link>
										</Button>
									) : (
										<Button className='w-full md:w-fit'>
											Ativar benefício Agora <ArrowRight className='h-4 w-4' />
										</Button>
									)}
								</CardFooter>
							</Card>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
}
