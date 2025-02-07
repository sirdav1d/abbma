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
import BuyButton from '@/components/buy-button';
import { howMuchIsAble } from '@/utils/is-able-to-add-dependents';

export default async function DependentsPage() {
	const tickets = await GetAllTicketsAction({ email: null });
	const { dependents } = await GetAllDependentsAction();

	const activeTickets = tickets.data?.filter((item) => item.isActive);

	const valoresProcurados = ['TELEMEDICINE_COUPLE', 'TELEMEDICINE_FAMILY'];

	const isTelemedicine = activeTickets?.some((elemento) =>
		valoresProcurados.includes(elemento.type),
	);

	const session = await getServerSession();
	const user = session && (await getUserAction({ email: session.user.email }));

	if (!user) {
		redirect('/login');
	}

	const respIsAble = await howMuchIsAble();

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Gerencie Seus Dependentes
			</h2>
			{!isTelemedicine && !respIsAble ? (
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
							<CardTitle className='text-xl'>
								Você Pode Adicionar mais {respIsAble?.number ?? 0} dependente(s)
							</CardTitle>
							<div className='flex items-center gap-5'>
								{respIsAble?.type && (
									<BuyButton
										size='sm'
										priceType={respIsAble.type}
										isAddOn={true}
										content='Benefício Extra -  R$24,99 por vida'
									/>
								)}
								{respIsAble?.number ? (
									<ModalCreateDependent
										isAble={respIsAble.number > 0 && isTelemedicine!}
										userId={String(user.user?.id)}
									/>
								) : null}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{dependents && dependents?.length > 0 ? (
							<TableDependent
								dependents={dependents}
								userId={String(user.user?.id)}
							/>
						) : null}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
