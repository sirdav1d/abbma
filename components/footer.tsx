/** @format */

import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logo-principal.png';
import Link from 'next/link';
import { Separator } from './ui/separator';

export default function Footer() {
	return (
		<div className='w-full h-full px-4 bg-slate-950'>
			<div className='mx-auto max-w-7xl py-20 text-center flex flex-col gap-10 relative '>
				<div>
					<Link href='/'>
						<Image
							src={logo}
							alt='logo ABBMA'
							width={140}
							height={140}
							className='max-w-[324px]  mx-auto md:mx-0'></Image>
					</Link>
					<div></div>
				</div>

				<Separator className='dark' />
				<div className='flex justify-between w-full flex-col md:flex-row gap-5'>
					<p className=' text-xs text-muted-foreground'>
						2024 &copy; Associação Brasileira de Benefícios para Militares e
						Autônomos - ABBMA. Todos os direitos reservados
					</p>
					<div className='text-xs text-muted-foreground flex gap-5 md:gap-10 flex-col md:flex-row'>
						<Link
							className='hover:text-red-600 transition-all  ease-linear duration-200'
							href={'/politica'}>
							Políticas de Privacidade
						</Link>
						<Link
							className='hover:text-red-600 transition-all  ease-linear duration-200'
							href={'/termos'}>
							Termos de Uso
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
