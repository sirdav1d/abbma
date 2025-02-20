/** @format */

import BuyButton from '@/components/buy-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { howMuchIsAble } from '@/utils/is-able-to-add-dependents';
import { Ticket } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ModalCreateDependent from './_components/modal-create-dependent';
import TableDependent from './_components/table-dependent';
import { UpgradePlanBanner } from './_components/upgrade-banner';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

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
		next: { tags: ['user-by-email-dependent'], revalidate: 3600 },
	});

	const data = await res.json();

	if (!data) {
		return (
			<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5 text-muted-foreground'>
				Nenhum dependente foi encontrado
			</div>
		);
	}
	const activeTickets = data.user.tickets?.filter(
		(item: Ticket) => item.isActive,
	);

	const valoresProcurados = ['TELEMEDICINE_COUPLE', 'TELEMEDICINE_FAMILY'];

	const isTelemedicine = activeTickets?.some((elemento: Ticket) =>
		valoresProcurados.includes(elemento.type),
	);

	const respIsAble = await howMuchIsAble();

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Gerencie Seus Dependentes
			</h2>
			{!isTelemedicine && !respIsAble ? (
				<>
					<div className='flex flex-col items-center justify-center my-10  gap-5 w-full'>
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
				<Card className='mt-5 mb-20 '>
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
										content={`Benefício Extra - ${respIsAble.type == 'TELEMEDICINE_FAMILY' ? 'R$19,49' : 'R$22,49'}`}
									/>
								)}
								{data.user.id && respIsAble?.number ? (
									<ModalCreateDependent
										isAble={respIsAble.number > 0 && isTelemedicine!}
										userId={data.user.id}
									/>
								) : null}
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
				className={`${respIsAble?.type == 'TELEMEDICINE_FAMILY' && 'hidden'} mt-auto  w-full max-w-7xl `}>
				<UpgradePlanBanner />
			</div>
		</div>
	);
}
