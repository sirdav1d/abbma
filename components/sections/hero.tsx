/** @format */

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import heroImage from '@/assets/beautiful-smiling.png';
import RetCuboid from '@/assets/ret-cuboid';
import RetCross from '@/assets/ret-cross';

export default function Hero() {
	return (
		<div className='w-full h-screen bg-gradient-to-r from-blue-700 to-blue-950 px-4'>
			<div className='flex items-center justify-center h-full max-w-7xl mx-auto'>
				<div className='flex flex-col gap-10 mt-20 w-2/3 relative '>
					<h1 className='font-bold text-5xl text-slate-50 text-balance leading-normal'>
						<span className='text-yellow-500'>Por que pagar mais?</span>
						<br />
						Simplifique sua vida com nosso clube de vantagens e descontos em
						telemedicina
					</h1>
					<div className='flex flex-col gap-5 w-full'>
						<Button
							size={'lg'}
							className='bg-red-800 text-lg w-fit  hover:bg-red-600 font-semibold'>
							<p>Assinar Agora</p>
							<ArrowRight className='scale-125' />
						</Button>
						<p className='text-zinc-50 max-w-xs'>
							Descubra um mundo de possibilidades por{' '}
							<span className='font-bold'>apenas R$ 6,99</span>{' '}
						</p>
					</div>
					<div className='absolute -left-80 -top-10'>
						<RetCuboid />
					</div>
				</div>
				<div className='w-1/3  relative h-full'>
					<div className='absolute -right-24 top-40'>
						<RetCuboid />
					</div>
					<div className='absolute -left-56 bottom-5 z-50'>
						<RetCross />
					</div>
					<Image
						src={heroImage}
						alt='Mulher sorrindo olhando para celular'
						width={1280}
						height={800}
						className='w-[680px] h-auto object-contain absolute bottom-0'
					/>
				</div>
			</div>
		</div>
	);
}
