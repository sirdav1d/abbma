/** @format */

import { datoRequestAction } from '@/actions/datocms/datocms';
import logo from '@/assets/logo-principal.png';
import wppLogo from '@/assets/whatsapp-logo.png';
import DektopHeader from '@/components/desktop-header';
import Footer from '@/components/footer';
import MobileHeader from '@/components/mobile-header';
import About from '@/components/sections/about';
import CTA from '@/components/sections/cta';
import Faq from '@/components/sections/faq';
import Features from '@/components/sections/features';
import Hero from '@/components/sections/hero';
import Price from '@/components/sections/price';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
	const { data } = await datoRequestAction();
	console.log(data.videoHeroThumb.url);

	return (
		<main className='bg-slate-100 overflow-x-hidden '>
			<div className='relative w-full h-full'>
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
					<Link href='/'>
						<Image
							src={logo}
							alt='logo ABBMA'
							width={48}
							height={60}></Image>
					</Link>
				</div>
				<DektopHeader />
				<Hero />
				<About
					urlThumb={data.videoHeroThumb.url}
					urlVideo={data.videoHero.url}
				/>
				<Features />
				<Price />
				<Faq />
				<CTA />
				<Footer />
			</div>
		</main>
	);
}
