/** @format */

import DektopHeader from '@/components/desktop-header';
import About from '@/components/sections/about';
import CTA from '@/components/sections/cta';
import Features from '@/components/sections/features';
import Hero from '@/components/sections/hero';

export default function Home() {
	return (
		<main className='bg-slate-50'>
			<div className='relative w-full h-full'>
				<DektopHeader />
				<Hero />
				<About />
				<Features />
				<CTA />
			</div>
		</main>
	);
}
