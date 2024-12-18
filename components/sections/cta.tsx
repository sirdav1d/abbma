/** @format */

import BuyButton from '../buy-button';
import { FadeText } from '../ui/fade-text';
import RetroGrid from '../ui/retro-grid';

export default function CTA() {
	return (
		<div
			className='md:p-10 px-4 py-8 w-full rounded-lg bg-gradient-to-b max-w-7xl mx-auto relative
     from-blue-800  to-blue-950 flex flex-col items-center justify-center gap-5 my-20'>
			<FadeText
				framerProps={{
					show: { transition: { delay: 0.2 } },
				}}>
				<h2 className='text-slate-50 drop-shadow-md text-center md:text-balance text-2xl md:text-3xl md:max-w-3xl mx-auto z-10 max-w-full'>
					Aproveite todos os nossos benefícios, estamos prontos para oferecer a
					você <span className='font-bold'>o que há de melhor,</span> com um{' '}
					<span className='font-bold'>custo mais acessível</span>
				</h2>
			</FadeText>

			<BuyButton full={false} />

			<RetroGrid />
		</div>
	);
}
