/** @format */

import logo from '@/assets/logo-principal.png';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Separator } from './ui/separator';

export default function Footer() {
	const links = [
		{ label: 'Home', href: '/homepage' },
		{ label: 'Telemedicina', href: '/telemedicina' },
		{ label: 'Entrar', href: '/login' },
		{ label: 'Cadastrar', href: '/register' },
	];

	const socialLinks = [
		{
			icon: <FaInstagram size={28} />,
			href: 'https://www.instagram.com/abbmaassociacao',
		},
		{
			icon: <FaWhatsapp size={28} />,
			href: 'https://wa.me/5521986508882?text=Ol%C3%A1%2C%20estava%20navegando%20no%20seu%20site%20e%20preciso%20de%20ajuda',
		},
		{
			icon: <FaFacebook size={28} />,
			href: 'https://www.facebook.com/people/ABBMA-Associa%C3%A7%C3%A3o/61572398223506/',
		},
	];
	return (
		<div className='w-full h-full px-4 bg-gradient-to-b from-blue-950 to-blue-900'>
			<div className='mx-auto max-w-7xl py-20 text-center flex flex-col gap-10 relative '>
				<div className='flex flex-col gap-10 md:gap-0 md:flex-row items-center w-full justify-between'>
					<Link href='/homepage'>
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
