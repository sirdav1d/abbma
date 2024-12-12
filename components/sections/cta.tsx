/** @format */

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import SquareWireframe from '@/assets/square-wireframe';

export default function CTA() {
	return (
		<div
			className='p-10 w-full rounded-xl max-w-7xl mx-auto bg-gradient-to-r relative
    overflow-hidden from-blue-800 to-blue-950 flex flex-col items-center justify-center gap-5'>
			<h2 className='text-slate-50 text-center text-balance text-3xl max-w-3xl mx-auto z-10'>
				Aproveite todos os nossos benefícios, estamos prontos para oferecer a
				você <span className='font-bold'>o que há de melhor,</span> com um{' '}
				<span className='font-bold'>custo mais acessível</span>
			</h2>
			<Button
				size={'lg'}
				className='bg-red-800 text-lg w-fit z-10  hover:bg-red-600 font-semibold mx-auto'>
				<p>Assinar Agora</p>
				<ArrowRight className='scale-150' />
			</Button>
			<div className='absolute'>
				<SquareWireframe />
			</div>
		</div>
	);
}
