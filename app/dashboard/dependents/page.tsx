/** @format */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/auth/auth';
import { Ticket } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ModalCreateDependent from './_components/modal-create-dependent';
import TableDependent from './_components/table-dependent';
import { UpgradePlanBanner } from './_components/upgrade-banner';

export default async function DependentsPage() {
	const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
	const session = await auth();

	if (!session?.user) {
		redirect('login');
	}
	const res = await fetch(`${baseUrl}/api/get-user-by-email`, {
		method: 'GET',
		headers: {
			'X-My-Custom-Header': String(session.user.email),
		},
		next: { tags: ['user-by-email'] },
	});

	const data = await res.json();

	if (!data) {
		return (
			<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5 text-muted-foreground'>
				Nenhum dependente foi encontrado
			</div>
		);
	}

	const tickets: Ticket[] = data.user.tickets;
	const activeTicket = tickets?.findLast(
		(item: Ticket) => item.isActive && item.type !== 'CLUB_VANTAGES',
	);

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			{!activeTicket ? (
				<>
					<div className='flex flex-col justify-center my-10  gap-5 w-full'>
						<h3 className='text-muted-foreground'>
							Você não possui nenhum plano no momento
						</h3>
						<Button
							asChild
							variant={'link'}>
							<Link href={'/dashboard'}>
								Ver Planos Disponíveis <ArrowRight />
							</Link>
						</Button>
						<Separator className='my-5' />
					</div>
				</>
			) : (
				<Card className='mt-5 mb-20 '>
					<CardHeader>
						<div className='flex justify-between md:items-center md:flex-row flex-col gap-5'>
							<CardTitle className='text-sm md:text-xl text-center md:text-left'>
								Gerencie Seus Dependentes
							</CardTitle>
							<div className='flex flex-col md:flex-row items-center gap-5'>
								<ModalCreateDependent userId={data.user.id} />
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{data.user?.id &&
						data.user.Dependent &&
						data.user.Dependent?.length > 0 ? (
							<TableDependent
								dependents={data.user.Dependent}
								userId={data.user.id}
							/>
						) : null}
					</CardContent>
				</Card>
			)}
			<div
				className={`${activeTicket?.type == 'TELEMEDICINE_FAMILY' && 'hidden'} mt-auto  w-full max-w-7xl `}>
				<UpgradePlanBanner />
			</div>
		</div>
	);
}
