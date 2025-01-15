/** @format */

import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/ui/fade-text';
import { ArrowRight } from 'lucide-react';
import image from '../../../assets/telemedicina.jpg';
import Image from 'next/image';
import BgTelemedicina from '@/components/bg-telemedicina-hero';

export default function Hero() {
	return (
		<div className='w-full relative h-fit py-56 overflow-hidden scroll-mt-28'>
			<BgTelemedicina />
			<div className='max-w-7xl w-full items-center  flex mx-auto gap-20 justify-between z-10 h-full'>
				<div className='flex flex-col gap-5 w-2/3 justify-center z-10 '>
					<FadeText
						className='font-semibold text-2xl lg:text-5xl text-slate-50 md:text-balance capitalize leading-loose '
						direction='up'
						framerProps={{
							show: { transition: { delay: 0.2 } },
						}}>
						<h1>
							Conecte-se com médicos a qualquer hora, em qualquer lugar, sem
							esforço.
						</h1>
					</FadeText>
					<FadeText
						className='text-base font-light lg:text-lg text-slate-50 md:text-balance leading-normal md:max-w-full'
						direction='up'
						framerProps={{
							show: { transition: { delay: 0.4 } },
						}}>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Necessitatibus repudiandae atque voluptates animi reprehenderit
						</p>
					</FadeText>
					<Button
						asChild
						size={'lg'}
						className='bg-red-700 hover:bg-red-600 active:bg-red-700 max-w-xs mt-10 text-xl p-6'>
						<a href='#plans'>
							Assine Agora <ArrowRight className='w-8 h-8 scale-125' />
						</a>
					</Button>
				</div>
				<div className='absolute right-20 z-20'>
					<Image
						alt='telemedicina'
						width={1200}
						height={1000}
						src={image}
						className='max-w-[660px] object-cover object-center rounded-xl'></Image>
				</div>
			</div>
		</div>
	);
}
