/** @format */

import GetAllDependentsAction from '@/actions/dependents/get-all';
import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { getUserAction } from '@/actions/user/get-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ModalCreateDependent from './_components/modal-create-dependent';
import TableDependent from './_components/table-dependent';

export default async function DependentsPage() {
	const tickets = await GetAllTicketsAction({ email: null });
	const { data } = await GetAllDependentsAction();

	const valoresProcurados = ['TELEMEDICINE_COUPLE', 'TELEMEDICINE_FAMILY'];

	const isAble = tickets?.data?.some((elemento) =>
		valoresProcurados.includes(elemento.type),
	);

	const session = await getServerSession();
	const user = session && (await getUserAction({ email: session.user.email }));

	if (!user) {
		redirect('/login');
	}
	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Gerencie Seus Dependentes
			</h2>
			{tickets.data?.length === 0 ? (
				<>
					{' '}
					<div className='flex flex-col items-center justify-center mt-10 gap-5 w-full'>
						<h3 className='text-muted-foreground'>
							Você não possui planos que permitam ter dependentes
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
				<Card className='mt-5'>
					<CardHeader>
						<div className='flex justify-between md:items-center md:flex-row flex-col gap-5'>
							<CardTitle>Dependentes</CardTitle>
							<ModalCreateDependent
								isAble={isAble!}
								userId={String(user.user?.id)}
							/>
						</div>
					</CardHeader>
					<CardContent>
						{data ? (
							<TableDependent
								dependents={data}
								userId={String(user.user?.id)}
							/>
						) : (
							<></>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
