/** @format */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo-principal.png';
import wppLogo from '@/assets/whatsapp-logo.png';
import DektopHeader from '@/components/desktop-header';
import MobileHeader from '@/components/mobile-header';
export default function MarketingLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<a
				className='fixed z-50 md:bottom-5 md:right-5 hover:scale-110 transition-all ease-linear duration-200 scale-75 bottom-0 right-0 md:scale-100'
				href='https://wa.me/5521986508882?text=Ol%C3%A1%2C%20estava%20navegando%20no%20seu%20site%20e%20preciso%20de%20ajuda'
				target='_blank'
				rel='noopener noreferrer'>
				<Image
					src={wppLogo}
					alt='Whatsapp Logo'
					width={64}
					height={64}></Image>
			</a>
			<div className='flex z-50 px-4 py-4 items-center justify-between md:hidden'>
				<MobileHeader />
				<Link href='/homepage'>
					<Image
						src={logo}
						alt='logo ABBMA'
						width={48}
						height={60}></Image>
				</Link>
			</div>
			<DektopHeader />
			{children}
		</div>
	);
}
