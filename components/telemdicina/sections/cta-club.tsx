/** @format */

import React from 'react';
import Image from 'next/image';
import app1 from '../../../assets/telemedicina.jpg';
import { CircleCheckBig } from 'lucide-react';
import { associate } from '@/constants/associate';

export default function CTAClub() {
	return (
		<div className='py-10 max-w-7xl w-full items-center h-full flex flex-col mx-auto gap-10 justify-between z-10 relative text-center md:text-left'>
			<div className='flex flex-col gap-5 items-center justify-center'>
				<h2 className='font-semibold text-3xl xl:text-4xl md:text-balance capitalize md:leading-loose max-w-xl text-center'>
					Cuide da Saúde e Aproveite os Melhores Descontos
				</h2>
				<p className='text-balance text-center max-w-3xl'>
					O plano de telemedicina que oferece muito mais! Além do cuidado com
					sua saúde, desfrute de descontos exclusivos em uma ampla rede de
					parceiros.
				</p>
			</div>
			<div className='flex items-center justify-center gap-10 2xl:gap-20 w-full flex-col-reverse md:flex-row'>
				<div className='w-full h-[632px] overflow-hidden rounded-xl'>
					<Image
						alt='telemedicina'
						width={1200}
						height={1000}
						src={app1}
						className='object-cover object-center rounded-xl h-[632px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>
				</div>
				<div className='p-10 text-slate-50 bg-gradient-to-br from-blue-600 to-blue-950 w-full h-full rounded-xl flex  flex-col gap-5'>
					<h3 className='font-semibold text-3xl xl:text-4xl md:text-balance capitalize'>
						ABBMA + Medicar
					</h3>
					<p className='font-light'>
						A parceria entre o Clube ABBMA e a Medicar oferece telemedicina 24/7
						com <strong>profissionais qualificados</strong>, além de descontos
						exclusivos no Clube de Vantagens ABBMA, trabalahmos para promover
						mais saúde, praticidade e{' '}
						<strong>economia para você e sua família.</strong>
					</p>
					<ul className='flex flex-col gap-5 w-full'>
						{associate.map((item, index) => {
							return (
								<li
									key={index}
									className='flex gap-2 text-sm items-center'>
									<CircleCheckBig />
									{item}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
