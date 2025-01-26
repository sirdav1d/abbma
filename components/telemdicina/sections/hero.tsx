/** @format */

import BgTelemedicina from '@/components/bg-telemedicina-hero';
import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/ui/fade-text';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import app1 from '../../../assets/telemedicina.jpg';
import Link from 'next/link';

export default function Hero() {
	return (
		<div className='w-full relative max-h-[660px] md:max-h-full md:h-fit pt-16 md:pb-40  xl:py-36 2xl:py-52  md:scroll-mt-28 md:mb-0'>
			<BgTelemedicina />
			<div className='md:max-w-xl xl:max-w-7xl w-fit items-start justify-start flex xl:mx-auto gap-20  z-10 h-full flex-col max-w-[364px] mx-4 md:mx-20'>
				<div className='flex flex-col items-start gap-5 w-fit xl:w-2/3 justify-center z-10 '>
					<FadeText
						className='font-semibold text-3xl xl:text-5xl text-slate-50 md:text-balance capitalize'
						direction='up'
						framerProps={{
							show: { transition: { delay: 0.2 } },
						}}>
						<h1 className=''>
							Conecte-se com médicos a qualquer hora, em qualquer lugar, sem
							esforço.
						</h1>
					</FadeText>
					<FadeText
						className='text-base font-light xl:text-lg text-slate-50 md:text-balance md:leading-normal md:max-w-full '
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
						<Link href='/register'>
							Assine Agora <ArrowRight className='w-8 h-8 scale-125' />
						</Link>
					</Button>
				</div>
				<div className='md:absolute md:right-28 lg:right-60 2xl:right-44 2xl:top-60 lg:top-20  md:top-60 z-10 flex gap-0 '>
					<Image
						alt='telemedicina'
						width={1200}
						height={1000}
						src={app1}
						className='md:max-w-[480px] 2xl:max-w-[600px] w-full object-contain object-center  md:translate-x-40 2xl:translate-x-20 2xl:translate-y-0  md:translate-y-40 xl:scale-110  xl:translate-y-28   z-40 rounded-xl'></Image>
				</div>
			</div>
		</div>
	);
}
