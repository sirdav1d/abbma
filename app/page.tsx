/** @format */

import DektopHeader from '@/components/desktop-header';
import Footer from '@/components/footer';
import About from '@/components/sections/about';
import CTA from '@/components/sections/cta';
import Faq from '@/components/sections/faq';
import Features from '@/components/sections/features';
import Hero from '@/components/sections/hero';
import Price from '@/components/sections/price';
import Image from 'next/image';
import wppLogo from '@/assets/whatsapp-logo.png';
import MobileHeader from '@/components/mobile-header';
import Link from 'next/link';
import logo from '@/public/abbma-favicon.png';

export default function Home() {
	return (
		<main className='bg-slate-50 overflow-x-hidden'>
			<div className='relative w-full h-full'>
				<a
					className='fixed bottom-5 right-5 hover:scale-110 transition-all ease-linear duration-200'
					href='https://wa.me/5521986508882?text=Ol%C3%A1%2C%20estava%20navegando%20no%20seu%20site%20e%20preciso%20de%20ajuda'
					target='_blank'
					rel='noopener noreferrer'>
					<Image
						src={wppLogo}
						alt='Whatsapp Logo'
						width={64}
						height={64}></Image>
				</a>
				<div className='flex z-50 px-4 py-2 items-center justify-between md:hidden'>
					<MobileHeader />
					<Link href='/'>
						<Image
							src={logo}
							alt='logo ABBMA'
							width={48}
							height={48}></Image>
					</Link>
				</div>
				<DektopHeader />
				<Hero />
				<About />
				<Features />
				<Price />
				<Faq />
				<CTA />
				<Footer />
			</div>
		</main>
	);
}
