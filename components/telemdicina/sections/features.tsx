/** @format */

import { telemedicine } from '@/constants/telemedicine';
import { CircleCheckBig } from 'lucide-react';
import React from 'react';

export default function Features() {
	return (
		<div className='max-w-7xl w-full h-full  mx-auto py-10 '>
			<div className='mx-4 flex flex-col gap-10 md:gap-14 justify-center items-center '>
				<div className='flex flex-col gap-5 text-center justify-center items-center'>
					<h2 className='font-semibold text-2xl lg:text-4xl md:text-balance capitalize md:leading-loose'>
						Principais Especialidades Médicas
					</h2>
					<p className='text-balance text-sm md:text-base'>
						Contamos com vários especialistas para melhor atende-los, tudo isso
						sem sair de casa.
						<br /> Cuide de quem você Ama, seja um associado e desfrute dessa
						comodidade.
					</p>
				</div>
				<ul className='grid gap-3.5 md:gap-5 grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 w-full  mx-auto'>
					{telemedicine.map((item, index) => {
						return (
							<li
								key={index}
								className='flex text-center  md:justify-start items-center justify-center  text-balance gap-2 flex-shrink-0 flex-grow-0 text-base'>
								<CircleCheckBig className='w-5 h-5 text-green-500 flex-shrink-0' />
								{item}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
