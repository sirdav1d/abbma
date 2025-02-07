/** @format */

import RetCross from '@/assets/ret-cross';
import RetCuboid from '@/assets/ret-cuboid';
import { ArrowRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

import BlurIn from '../../ui/blur-in';
import { Button } from '../../ui/button';
import { FadeText } from '../../ui/fade-text';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';

export default async function Hero({ urlThumb }: { urlThumb: string }) {
	const session = await getServerSession();
	return (
		<div className='w-full h-full md:h-screen min-h-screen bg-gradient-to-r from-blue-700 to-blue-950 px-4'>
			<div className='flex items-center gap-10 flex-col md:flex-row justify-center h-full max-w-7xl mx-auto'>
				<div className='flex flex-col justify-center gap-10 lg:w-2/3 relative h-full '>
					<div className='mt-10  md:max-w-2xl'>
						<FadeText
							className='font-bold text-2xl  lg:text-4xl text-yellow-500 md:text-balance leading-normal '
							direction='up'
							framerProps={{
								show: { transition: { delay: 0.2 } },
							}}>
							<h2 className='md:leading-normal'>Mais Benefícios Com A ABBMA</h2>
						</FadeText>
						<FadeText
							className='font-bold text-2xl lg:text-4xl text-slate-50 md:text-balance leading-normal '
							direction='up'
							framerProps={{
								show: { transition: { delay: 0.4 } },
							}}>
							<h1 className='md:leading-normal'>
								Tem Clube de Vantagens! <br />
								Tem Telemedicina 24hrs!
								<br /> Tem Cursos Gratuitos! <br /> Tem Descontos Exclusivos!
								<br /> Tem muito mais pra você e para quem você ama!
							</h1>
						</FadeText>
					</div>
					{session?.user ? (
						<Button
							asChild
							size={'lg'}
							className='w-fit text-lg z-20 bg-slate-50 hover:bg-transparent border-slate-50 border text-blue-600 hover:text-slate-50'>
							<Link href='/dashboard'>
								Meus Benefícios <ArrowRight className='scale-150' />
							</Link>
						</Button>
					) : (
						<div className='flex flex-col gap-5 w-full'>
							<FadeText
								direction='up'
								framerProps={{
									show: { transition: { delay: 0.6 } },
								}}>
								<Button
									size='lg'
									asChild
									className='text-lg bg-red-700 active:bg-red-600 hover:bg-red-600'>
									<Link href={'/register'}>
										Assinar <ArrowRight className='scale-125' />
									</Link>
								</Button>
							</FadeText>
							<FadeText
								direction='up'
								framerProps={{
									show: { transition: { delay: 0.8 } },
								}}>
								<p className='text-zinc-50 max-w-xs'>
									seja um associado por{' '}
									<span className='font-semibold'>apenas R$ 6,99</span> e já
									garanta o{' '}
									<span className='font-semibold'>clube de vantagens</span>
								</p>
							</FadeText>
						</div>
					)}

					<BlurIn className='absolute hidden md:block lg:-left-80 lg:-top-10 -top-80 left-40'>
						<RetCuboid />
					</BlurIn>
				</div>
				<div className='lg:w-1/3 w-full md:relative h-full mx-auto'>
					<BlurIn className='absolute lg:-right-24 lg:top-40 -top-40 left-0 invisible md:visible'>
						<RetCuboid />
					</BlurIn>
					<BlurIn className='absolute -left-56 md:bottom-5 z-10 '>
						<RetCross />
					</BlurIn>
					<div className='md:absolute md:bottom-0'>
						<HeroVideoDialog
							isTelemedicine={false}
							animationStyle='top-in-bottom-out'
							videoSrc={'https://www.youtube.com/embed/Rww58Jj3eYs'}
							thumbnailSrc={
								urlThumb ??
								'https://startup-template-sage.vercel.app/hero-light.png'
							}
							thumbnailAlt='Hero Video'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
