/** @format */

import Footer from '@/components/footer';
import Faq from '@/components/home/sections/faq';
import About from '@/components/telemdicina/sections/about';
import CTA from '@/components/telemdicina/sections/cta';
import Features from '@/components/telemdicina/sections/features';
import Hero from '@/components/telemdicina/sections/hero';
import Plans from '@/components/telemdicina/sections/plans';
import React from 'react';

export default function TelemedicinaPage() {
	return (
		<main className='overflow-x-hidden w-full h-full min-h-screen bg-slate-50'>
			<div
				id='home'
				className='mt-28 w-full '>
				<Hero />
			</div>
			<About />
			<Features />
			<Plans />
			<Faq />
			<CTA />
			<Footer />
		</main>
	);
}
