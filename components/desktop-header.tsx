/** @format */

import logo from '@/assets/logo-principal.png';
import { AppWindow } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import DesktopHeaderLinks from './desktop-header-links';
import SignOutBtn from './sign-out';
import { Button } from './ui/button';
import { auth } from '@/lib/auth/auth';

export default async function DektopHeader() {
	const session = await auth();
	return (
		<div className='hidden md:flex w-full fixed py-4   mx-auto bg-slate-50/80 backdrop-blur-md z-50 px-4'>
			<div className='flex items-center justify-between w-full max-w-7xl mx-auto'>
				<Link href='/homepage'>
					<Image
						src={logo}
						alt='logo ABBMA'
						width={80}
						height={80}></Image>
				</Link>

				<DesktopHeaderLinks />
				{!session ? (
					<div className='flex items-center gap-3 '>
						<Button
							asChild
							className='bg-blue-700 hover:bg-blue-600 font-semibold text-slate-50'>
							<Link
								href={'/login'}
								prefetch>
								Entrar
							</Link>
						</Button>
						<Button
							variant={'outline'}
							asChild
							className='border-blue-600 border-2 text-blue-600  font-semibold hover:text-slate-100 hover:bg-blue-600 bg-transparent'>
							<Link
								href={'/register'}
								prefetch>
								Cadastrar
							</Link>
						</Button>
					</div>
				) : (
					<div className='flex items-center gap-3 '>
						<Button
							asChild
							className='bg-blue-700 hover:bg-blue-600 font-semibold text-slate-50'>
							<Link
								href={'/dashboard'}
								prefetch>
								<AppWindow
									size={40}
									className='scale-125 mr-1.5'
								/>
								Minha Área
							</Link>
						</Button>
						<SignOutBtn />
					</div>
				)}
			</div>
		</div>
	);
}
