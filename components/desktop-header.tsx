/** @format */

import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logo-principal.png';
import Link from 'next/link';
import { Button } from './ui/button';

export default function DektopHeader() {
	const links = [
		{ href: '#club', label: 'Clube de Vantagens' },
		{ href: '#tele', label: 'Telemedicina' },
		{ href: '#seg', label: 'Saúde e Seguros' },
		{ href: '#price', label: 'Preços' },
	];

	return (
		<div className='hidden md:flex w-full fixed py-4  mx-auto bg-slate-50/80 backdrop-blur-md z-50'>
			<div className='flex items-center justify-between w-full max-w-7xl mx-auto'>
				<Link href='/'>
					<Image
						src={logo}
						alt='logo ABBMA'
						width={80}
						height={80}></Image>
				</Link>

				<nav>
					<ul className='flex gap-5 font-normal text-base'>
						{links.map((l, index) => {
							return (
								<li
									key={index}
									className='hover:text-red-600 transition-all ease-linear duration-200'>
									<a href={l.href}>{l.label}</a>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className='flex items-center gap-3 '>
					<Button
						asChild
						className='bg-blue-700 hover:bg-blue-600 font-semibold'>
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
			</div>
		</div>
	);
}
