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
import { AlertCircle } from 'lucide-react';
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
		<div className='mx-auto w-full max-w-7xl px-4 xl:px-0  py-5'>
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
								<benefit.icon className='h-4 w-4 mr-2' />
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
										<div className='flex items-center'>
											<benefit.icon className='h-6 w-6 mr-2' />
											<CardTitle>{benefit.title}</CardTitle>
										</div>
										{isActivePlan && isActivePlan.type == benefit.id ? (
											<Badge>Ativo</Badge>
										) : (
											<Badge variant={'outline'}>Inativo</Badge>
										)}
									</div>
									<CardDescription>{benefit.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<p className='whitespace-pre-line'>{benefit.content}</p>{' '}
								</CardContent>
								<CardFooter>
									<Button>
										<AlertCircle className='mr-2 h-4 w-4' />
										Abrir Chamado
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</div>
	);
}
