/** @format */

'use client';

import React from 'react';
import { Separator } from './ui/separator';
import SignOutBtn from './sign-out';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/logo-principal.png';

export default function HeaderDash() {
	const routeTitles: { [key: string]: string } = {
		'/dashboard': 'Visão Geral',
		'/dashboard/benefits': 'Meus Benefícios',
		'/dashboard/dependents': 'Dependentes',
		'/dashboard/billing': 'Planos e Pagamentos',
		'/dashboard/tickets': 'Meus Chamados',
		'/dashboard/help': 'Ajuda e Suporte',
		'/dashboard/profile': 'Meu Perfil',
	};

	const pathname = usePathname();
	const title = routeTitles[pathname] || 'Dashboard';
	return (
		<div className=' w-full max-w-7xl mx-auto flex flex-col gap-5'>
			<div className='w-full flex items-center gap-3'>
				<Image
					src={logo}
					alt='logo ABBMA'
					width={400}
					height={400}
					className='w-20 object-contain'></Image>
				<h2 className='font-bold text-3xl lg:text-5xl w-full'> {title}</h2>
				<div>
					<SignOutBtn />
				</div>
			</div>
			<Separator className='sclae-150' />
		</div>
	);
}
