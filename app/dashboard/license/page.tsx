/** @format */

import { getUserAction } from '@/actions/user/get-user';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import License from './_components/license';
import GetAllDependentsAction from '@/actions/dependents/get-all';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function LicensePage() {
	const session = await getServerSession();
	if (!session) {
		redirect('/login');
	}

	const { user } = await getUserAction({ email: session.user.email });
	const { dependents } = await GetAllDependentsAction();

	const activeDependents = dependents?.filter((item) => item.isActive);

	return (
		user && (
			<div className='max-w-7xl mx-auto px-4 py-5 w-full 2xl:px-0'>
				<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
					Tenha acesso à sua carteirinha e de seus dependentes
				</h2>
				{user.isSubscribed ? (
					<div className='flex flex-col  gap-2 mt-5'>
						<h3 className='font-bold'>Minha Carteirinha</h3>
						<div className=' w-full max-w-lg'>
							<License
								user={user}
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
							{activeDependents?.map((item) => {
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
