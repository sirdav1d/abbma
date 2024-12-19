/** @format */

import RetCross from '@/assets/ret-cross';
import RetCuboid from '@/assets/ret-cuboid';
import BuyButton from '../buy-button';
import HeroImage from '../heroImage';
import BlurIn from '../ui/blur-in';
import { FadeText } from '../ui/fade-text';
import { getServerSession } from 'next-auth';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Hero() {
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
								Tem Telemedicina!
								<br /> Tem Seguros! <br /> Tem Plano de Saúde!
								<br /> Tem muito mais pra você e para quem você ama!
							</h1>
						</FadeText>
					</div>
					{session?.user ? (
						<Button
							asChild
							size={'lg'}
							className='w-fit text-lg z-20 bg-blue-700 hover:bg-blue-600'>
							<Link href='/dashboard'>
								Ir para Dahsboard <ArrowRight className='scale-150' />
							</Link>
						</Button>
					) : (
						<div className='flex flex-col gap-5 w-full'>
							<FadeText
								direction='up'
								framerProps={{
									show: { transition: { delay: 0.6 } },
								}}>
								<BuyButton full={false} />
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
					)}

					<BlurIn className='absolute hidden md:block lg:-left-80 lg:-top-10 -top-80 left-40'>
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
