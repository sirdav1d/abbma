/** @format */

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import RetroGrid from '../ui/retro-grid';
import { FadeText } from '../ui/fade-text';

export default function CTA() {
	return (
		<div
			className='p-10 w-full rounded-xl bg-gradient-to-b max-w-7xl mx-auto relative
     from-blue-800 to-blue-500 flex flex-col items-center justify-center gap-5 my-10'>
			<FadeText
				framerProps={{
					show: { transition: { delay: 0.2 } },
				}}>
				<h2 className='text-slate-50 drop-shadow-md text-center text-balance text-3xl max-w-3xl mx-auto z-10'>
					Aproveite todos os nossos benefícios, estamos prontos para oferecer a
					você <span className='font-bold'>o que há de melhor,</span> com um{' '}
					<span className='font-bold'>custo mais acessível</span>
				</h2>
			</FadeText>

			<Button
				size={'lg'}
				className='bg-red-700 text-lg w-fit z-20  hover:bg-red-600 font-semibold mx-auto'>
				<p>Assinar Agora</p>
				<ArrowRight className='scale-150' />
			</Button>

			<RetroGrid />
		</div>
	);
}
