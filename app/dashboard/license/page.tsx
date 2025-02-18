/** @format */

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dependent } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import License from './_components/license';

export default async function LicensePage() {
	const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

	const headersList = await headers();
	const res = await fetch(`${baseUrl}/api/get-user-by-email`, {
		method: 'GET',
		headers: headersList,
		next: { revalidate: 3600 },
	});

	const data = await res.json();

	if (!data) {
		return (
			<div className='mx-auto max-w-7xl w-full mt-5 px-4 2xl:px-0 pb-5 text-muted-foreground'>
				Dados não encontrados
			</div>
		);
	}
	const activeDependents = data.user.Dependent?.filter(
		(item: Dependent) => item.isActive,
	);

	return (
		data.user && (
			<div className='max-w-7xl mx-auto px-4 py-5 w-full 2xl:px-0'>
				<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
					Tenha acesso à sua carteirinha e de seus dependentes
				</h2>
				{data.user.isSubscribed ? (
					<div className='flex flex-col  gap-2 mt-5'>
						<h3 className='font-bold'>Minha Carteirinha</h3>
						<div className=' w-full max-w-lg'>
							<License
								user={data.user}
								isTitular={true}
								isPageShare={false}
							/>
						</div>
					</div>
				) : (
					<div className='flex flex-col  gap-2 mt-5'>
						<h3 className='text-muted-foreground'>
							Você não possui planos ativos
						</h3>
						<Button
							asChild
							variant={'link'}>
							<Link href={'/dashboard'}>
								Ver Planos Disponíveis <ArrowRight />
							</Link>
						</Button>
					</div>
				)}

				<Separator className='my-5' />
				{activeDependents && activeDependents?.length > 0 && (
					<div className='flex flex-col gap-2'>
						<h3 className='font-bold'>Carteirinha dos meus dependentes</h3>
						<ul className='grid grid-cols-1 gap-2 md:grid-cols-2 w-full mx-auto '>
							{activeDependents?.map((item: Dependent) => {
								return (
									<li
										key={item.id}
										className='w-full max-w-lg'>
										<License
											user={item}
											isTitular={false}
											isPageShare={false}
										/>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		)
	);
}
