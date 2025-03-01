/** @format */

import RetCrossDark from '@/assets/ret-cross-dark';
import BlurIn from '@/components/ui/blur-in';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';

export default function About() {
	return (
		<div
			id='about'
			className='mt-10 py-20 mx-4 xl:mx-0'>
			<div className='max-w-7xl w-full items-center h-full flex flex-col xl:flex-row mx-auto gap-20 justify-between z-10 relative text-center md:text-left'>
				<BlurIn className='absolute -right-96 -top-40 scale-75'>
					<RetCrossDark />
				</BlurIn>
				<BlurIn className='absolute -left-80 bottom-0 scale-75'>
					<RetCrossDark />
				</BlurIn>
				<div className='flex flex-col gap-5 '>
					<h2 className='font-semibold text-2xl lg:text-4xl md:text-balance capitalize md:leading-loose'>
						Descubra os Benefícios da ABBMA com a Medicar!
					</h2>
					<p className='text-balance text-sm md:text-base'>
						A ABBMA traz mais <strong>qualidade de vida</strong> para você e sua
						família com uma parceria incrível:{' '}
						<strong>Medicar, o seu plano de telemedicina 24h!</strong> Seja um
						associado ABBMA e aproveite esse benefício exclusivo. Cuidar da
						saúde nunca foi tão <strong>fácil e acessível!</strong> Associe-se
						já e <strong>viva com mais tranquilidade!</strong>
					</p>
				</div>
				<div className='w-full '>
					<HeroVideoDialog
						isTelemedicine
						animationStyle='top-in-bottom-out'
						videoSrc={'https://www.youtube.com/embed/GH0xvi_SiHo'}
						thumbnailSrc={'/abbma-medicar-thumb.png'}
						thumbnailAlt='Hero Video'
					/>
				</div>
			</div>
		</div>
	);
}
