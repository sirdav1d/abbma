/** @format */

import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logo-principal.png';
import Link from 'next/link';
import { Separator } from './ui/separator';
import {
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaWhatsapp,
} from 'react-icons/fa';

export default function Footer() {
	const links = [
		{ label: 'Clube de Vantagens', href: '#club' },
		{ label: 'Telemedicina', href: '#tele' },
		{ label: 'Saúde e Seguros', href: '#seg' },
		{ label: 'Entrar', href: '/login' },
		{ label: 'Cadastrar', href: '/register' },
	];

	const socialLinks = [
		{ icon: <FaInstagram size={28} />, href: '#insta' },
		{ icon: <FaWhatsapp size={28} />, href: '#insta' },
		{ icon: <FaFacebook size={28} />, href: '#insta' },
		{ icon: <FaLinkedin size={28} />, href: '#insta' },
	];
	return (
		<div className='w-full h-full px-4 bg-slate-950'>
			<div className='mx-auto max-w-7xl py-20 text-center flex flex-col gap-10 relative '>
				<div className='flex flex-col gap-10 md:gap-0 md:flex-row items-center w-full justify-between'>
					<Link href='/'>
						<Image
							src={logo}
							alt='logo ABBMA'
							width={140}
							height={140}
							className='max-w-[324px] mx-auto md:mx-0'></Image>
					</Link>
					<div className='text-slate-50 flex flex-col md:flex-row text-sm gap-5'>
						{links.map((l, index) => {
							return (
								<Link
									className='hover:text-red-600 transition-all ease-linear duration-200'
									key={index}
									href={l.href}>
									{l.label}
								</Link>
							);
						})}
					</div>
					<div className='text-slate-50 flex text-sm gap-5'>
						{socialLinks.map((l, index) => {
							return (
								<Link
									className='hover:text-red-600 transition-all ease-linear duration-200'
									key={index}
									href={l.href}>
									{l.icon}
								</Link>
							);
						})}
					</div>
				</div>

				<Separator className='opacity-10 bg-slate-500 rounded-full' />
				<div className='flex justify-between w-full flex-col md:flex-row gap-5'>
					<p className=' text-xs text-muted-foreground'>
						2024 &copy; Associação Brasileira de Benefícios para Militares e
						Autônomos - ABBMA. Todos os direitos reservados
					</p>
					<div className='text-xs text-muted-foreground flex gap-5 md:gap-10 flex-col md:flex-row'>
						<Link
							className='hover:text-red-600 transition-all  ease-linear duration-200'
							href={'/politica'}>
							Políticas de Privacidade e Termos de Uso
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
