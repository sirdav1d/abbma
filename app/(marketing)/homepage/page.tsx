/** @format */

import { datoRequestAction } from '@/actions/datocms/datocms';

import Footer from '@/components/footer';

import About from '@/components/home/sections/about';
import CTA from '@/components/home/sections/cta';
import Faq from '@/components/home/sections/faq';
import Features from '@/components/home/sections/features';
import Hero from '@/components/home/sections/hero';
import Price from '@/components/home/sections/price';

export default async function Home() {
	const { data } = await datoRequestAction();

	return (
		<main className='bg-slate-100 overflow-x-hidden '>
			<div className='relative w-full h-full'>
				<Hero />
				<About urlThumb={data.videoHeroThumb.url} />
				<Features />
				<Price />
				<Faq />
				<CTA />
				<Footer />
			</div>
		</main>
	);
}
