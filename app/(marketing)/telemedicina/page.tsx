/** @format */

import Footer from '@/components/footer';
import Faq from '@/components/home/sections/faq';
import About from '@/components/telemdicina/sections/about';
import CTA from '@/components/telemdicina/sections/cta';
import Benefits from '@/components/telemdicina/sections/benefits';
import Hero from '@/components/telemdicina/sections/hero';
import Plans from '@/components/telemdicina/sections/plans';
import React from 'react';
import Features from '@/components/telemdicina/sections/features';

export default function TelemedicinaPage() {
	return (
		<main className='overflow-x-hidden w-full h-full min-h-screen bg-slate-50'>
			<div
				id='home'
				className='md:mt-28 w-full '>
				<Hero />
			</div>
			<About />
			<Benefits />
			<Features />
			<Plans />
			<Faq />
			<CTA />
			<Footer />
		</main>
	);
}
