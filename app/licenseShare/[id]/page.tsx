/** @format */

import { getDependentByIdAction } from '@/actions/dependents/get-dependent-by-id';
import { getUserByIdAction } from '@/actions/user/get-user-by-id';
import Image from 'next/image';
import logo from '@/assets/logo-principal.png';
import License from '@/app/dashboard/license/_components/license';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function LicenseUser({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const { user } = await getUserByIdAction({ id: id });
	const { dependent } = await getDependentByIdAction({ id: id });

	if (dependent && !dependent?.isActive || user && !user?.isActive) {
		return (
			<div className='flex items-center h-screen justify-center flex-col gap-5'>
				<Image
					src={logo}
					alt='logo ABBMA'
					width={164}
					height={164}
					className='object-contain'></Image>
				<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
					Usuário/Dependente inativo encontrado
				</h2>
				<Button
					asChild
					variant={'link'}
					className='text-sm md:text-base'>
					<Link href={'/dashboard/license'}>
						<ArrowLeft className='scale-125' />
						Voltar Para Carteirinhas
					</Link>
				</Button>
			</div>
		);
	}
	return (
		<div className=' bg-slate-100 mx-auto px-4 py-5 w-full 2xl:px-0 flex justify-center items-center h-screen'>
			{user ? (
				<div className='flex flex-col mx-auto justify-center gap-14 w-full max-w-2xl'>
					<License
						user={user}
						isTitular={true}
						isPageShare={true}
					/>
					<Button
						asChild
						variant={'link'}
						className='text-sm md:text-base'>
						<Link href={'/dashboard/license'}>
							<ArrowLeft className='scale-125' />
							Voltar Para Carteirinhas
						</Link>
					</Button>
				</div>
			) : dependent ? (
				<div className='flex flex-col mx-auto justify-center gap-14 w-full max-w-2xl'>
					<License
						user={dependent}
						isTitular={false}
						isPageShare={true}
					/>
					<Button
						asChild
						variant={'link'}
						className='text-sm md:text-base'>
						<Link href={'/dashboard/license'}>
							<ArrowLeft className='scale-125' />
							Voltar Para Carteirinhas
						</Link>
					</Button>
				</div>
			) : (
				<div className='flex items-center justify-center flex-col gap-5'>
					<Image
						src={logo}
						alt='logo ABBMA'
						width={164}
						height={164}
						className='object-contain'></Image>
					<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
						Nenhum usuário encontrado - 404
					</h2>
					<Button
						asChild
						variant={'link'}
						className='text-sm md:text-base'>
						<Link href={'/dashboard/license'}>
							<ArrowLeft className='scale-125' />
							Voltar Para Carteirinhas
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
}
