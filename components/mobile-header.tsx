/** @format */

'use client';

import React from 'react';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import logo from '@/assets/logo-principal.png';
import Link from 'next/link';

export default function MobileHeader() {
	const links = [
		{ href: '/#club', label: 'Clube de Vantagens' },
		{ href: '/#tele', label: 'Telemedicina' },
		{ href: '/#seg', label: 'Saúde e Seguros' },
		{ href: '/#price', label: 'Preços' },
	];
	return (
		<Drawer modal={false}>
			<DrawerTrigger
				asChild
				className='md:hidden'>
				<Button variant={'ghost'}>
					<Menu
						size={60}
						className='scale-150'
					/>
				</Button>
			</DrawerTrigger>
			<DrawerContent onCloseAutoFocus={(e) => e.preventDefault()}>
				<DrawerHeader>
					<DrawerTitle className='flex items-center justify-center gap-5'>
						<Link href='/'>
							<Image
								src={logo}
								alt='logo ABBMA'
								width={120}
								height={120}></Image>
						</Link>
					</DrawerTitle>
					<DrawerDescription className='text-balance'>
						Seja um associado e aproveite nossos benefícios
					</DrawerDescription>
				</DrawerHeader>
				<nav className='p-4'>
					<ul className='flex flex-col gap-5 text-base font-semibold'>
						{links.map((l, index) => {
							return (
								<li
									key={index}
									className='hover:text-red-600 transition-all ease-linear duration-200'>
									<DrawerClose>
										<a href={l.href}>{l.label}</a>
									</DrawerClose>
								</li>
							);
						})}
					</ul>
				</nav>
				<DrawerFooter>
					<div className='flex flex-col items-center gap-3'>
						<Button
							asChild
							className='bg-blue-700 hover:bg-blue-600 font-semibold w-full'>
							<Link
								href={'/login'}
								prefetch>
								Entrar
							</Link>
						</Button>
						<Button
							variant={'outline'}
							asChild
							className='border-blue-600 border-2 w-full text-blue-600  font-semibold hover:text-slate-100 hover:bg-blue-600 bg-transparent'>
							<Link
								href={'/register'}
								prefetch>
								Cadastrar
							</Link>
						</Button>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
