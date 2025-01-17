/** @format */

import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/ui/fade-text';
import { ArrowRight } from 'lucide-react';
import app1 from '../../../assets/app1.jpeg';
import appLogin from '@/assets/app-login.jpeg'
import Image from 'next/image';
import BgTelemedicina from '@/components/bg-telemedicina-hero';

export default function Hero() {
	return (
		<div className='w-full relative max-h-[660px] md:max-h-full md:h-fit pt-16 mb-40 md:pb-40  xl:py-36 2xl:py-52  md:scroll-mt-28 md:mb-0'>
			<BgTelemedicina />
			<div className='md:max-w-xl xl:max-w-7xl w-fit items-start justify-start flex xl:mx-auto gap-20  z-10 h-full flex-col max-w-[364px] mx-4 md:mx-20'>
				<div className='flex flex-col items-start gap-5 w-fit xl:w-2/3 justify-center z-10 '>
					<FadeText
						className='font-semibold text-3xl xl:text-5xl text-slate-50 md:text-balance capitalize leading-normal '
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
						className='text-base font-light xl:text-lg text-slate-50 md:text-balance leading-normal md:max-w-full '
						direction='up'
						framerProps={{
							show: { transition: { delay: 0.4 } },
						}}>
						<p className='max-w-80 md:max-w-96 xl:max-w-full'>
							Transforme a forma como você cuida da sua saúde com uma solução
							moderna, eficiente e sempre acessível onde quer que esteja.
						</p>
					</FadeText>
					<Button
						asChild
						size={'lg'}
						className='bg-red-700 hover:bg-red-600 active:bg-red-700 max-w-xs md:mt-10 text-lg'>
						<a href='#plans'>
							Assine Agora <ArrowRight className='w-8 h-8 scale-125' />
						</a>
					</Button>
				</div>
				<div className='md:absolute md:right-28 lg:right-60 2xl:right-44 2xl:top-60 lg:top-20  md:top-60 z-10 visible flex gap-0 '>
					<Image
						alt='telemedicina'
						width={1200}
						height={1000}
						src={appLogin}
						className='md:max-w-[480px] object-contain object-center xl:translate-x-[560px]  2xl:translate-x-[380px] xl:-translate-y-10 scale-90 2xl:scale-100 invisible xl:visible'></Image>	<Image
						alt='telemedicina'
						width={1200}
						height={1000}
						src={app1}
						className='md:max-w-[480px] object-contain object-center -translate-x-80  -translate-y-20 md:translate-x-64 2xl:translate-x-20 scale-90  md:-translate-y-20  xl:-translate-y-10 2xl:scale-100 z-40'></Image>
				</div>
			</div>
		</div>
	);
}
