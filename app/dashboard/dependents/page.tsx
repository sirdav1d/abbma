/** @format */

import GetAllDependentsAction from '@/actions/dependents/get-all';
import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import DependentForm from '@/components/forms/dependent-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import TableDependent from './_components/table-dependent';
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';
import { getUserAction } from '@/actions/user/get-user';
import { redirect } from 'next/navigation';

export default async function DependentsPage() {
	const tickets = await GetAllTicketsAction();
	const { data } = await GetAllDependentsAction();

	const valoresProcurados = ['TELEMEDICINE_COUPLE', 'TELEMEDICINE_FAMILY'];

	const isAble = tickets?.data?.some((elemento) =>
		valoresProcurados.includes(elemento.type),
	);

	const session = await getServerSession();
	const user = session && (await getUserAction(session?.user.email));

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
							<Dialog>
								<DialogTrigger asChild>
									<Button
										size={'sm'}
										disabled={!isAble}
										className='disabled:opacity-50 disabled:cursor-not-allowed'>
										Adicionar Dependente <Plus />
									</Button>
								</DialogTrigger>
								<DialogContent className='w-full h-full md:h-fit py-5 max-w-sm xl:max-w-4xl overflow-scroll'>
									<DialogHeader>
										<DialogTitle>Adicionar Novo Dependente</DialogTitle>
										<DialogDescription>
											Preencha os dados do novo dependente abaixo.
										</DialogDescription>
									</DialogHeader>
									<DependentForm
										userId={String(user?.user?.id)}
										user={null}
										isUpdating={false}
									/>
								</DialogContent>
							</Dialog>
						</div>
					</CardHeader>
					<CardContent>
						{data ? <TableDependent dependents={data} /> : <></>}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
