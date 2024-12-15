/** @format */

import RetCross from '@/assets/ret-cross';
import RetCuboid from '@/assets/ret-cuboid';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HeroImage from '../heroImage';
import { FadeText } from '../ui/fade-text';
import BlurIn from '../ui/blur-in';

export default function Hero() {
	return (
		<div className='w-full h-full min-h-screen bg-gradient-to-r from-blue-700 to-blue-950 px-4'>
			<div className='flex items-center gap-10 flex-col justify-center h-full max-w-7xl mx-auto'>
				<div className='flex flex-col gap-10 mt-20 lg:w-2/3 relative h-full '>
					<div>
						<FadeText
							className='font-bold text-3xl lg:text-5xl text-yellow-500 md:text-balance leading-normal'
							direction='up'
							framerProps={{
								show: { transition: { delay: 0.2 } },
							}}>
							<h2>Por que pagar mais?</h2>
						</FadeText>
						<FadeText
							className='font-bold text-3xl lg:text-5xl text-slate-50 md:text-balance leading-normal'
							direction='up'
							framerProps={{
								show: { transition: { delay: 0.4 } },
							}}>
							<h1>
								Simplifique sua vida com nosso clube de vantagens e descontos em
								telemedicina
							</h1>
						</FadeText>
					</div>
					<div className='flex flex-col gap-5 w-full'>
						<FadeText
							direction='up'
							framerProps={{
								show: { transition: { delay: 0.6 } },
							}}>
							<Button
								size={'lg'}
								className='bg-red-700 text-lg w-fit  hover:bg-red-600 font-semibold'>
								<p>Assinar Agora</p>
								<ArrowRight className='scale-125' />
							</Button>
						</FadeText>
						<FadeText
							direction='up'
							framerProps={{
								show: { transition: { delay: 0.8 } },
							}}>
							<p className='text-zinc-50 max-w-xs'>
								Descubra um mundo de possibilidades por{' '}
								<span className='font-bold'>apenas R$ 6,99</span>{' '}
							</p>
						</FadeText>
					</div>
					<BlurIn className='absolute lg:-left-80 lg:-top-10 -top-80 left-40'>
						<RetCuboid />
					</BlurIn>
				</div>
				<div className='lg:w-1/3 w-full md:relative h-full mx-auto'>
					<BlurIn className='absolute lg:-right-24 lg:top-40 -top-40 left-0 invisible md:visible'>
						<RetCuboid />
					</BlurIn>
					<BlurIn className='absolute -left-56 md:bottom-5 z-50 '>
						<RetCross />
					</BlurIn>
					<HeroImage />
				</div>
			</div>
		</div>
	);
}
