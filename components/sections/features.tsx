/** @format */

import React from 'react';
import vantagensImage from '@/assets/vantagensImage.png';
import telemedicinaImage from '@/assets/telemedicinaImage.png';
import segurosImage from '@/assets/segurosImage.png';
import Image from 'next/image';
import RetCrossDark from '@/assets/ret-cross-dark';
import RetStairs from '@/assets/ret-stairs';
import RetCuboidDark from '@/assets/ret-cuboid-dark';

export default function Features() {
	const features = [
		{
			title: 'Clube de Vantagens',
			id: 'club',
			description:
				'O clube de vantagens oferece descontos exclusivos em diversos seguimentos, em todo Brasil',
			src: vantagensImage,
		},
		{
			title: 'Telemedicina',
			id: 'tele',
			description:
				'Com a telemedicina, você tem acesso a atendimento médico em qualquer hora do dia, além de poder contar com consultas em diversas especialidades',
			src: telemedicinaImage,
		},
		{
			title: 'Seguros e Planos de Saúde',
			id: 'seg',
			description:
				'Proteja o que é mais importante! Conte com vantagens exclusivas em diversos Seguros e Planos de Saúdes, garantindo mais tranquilidade para você e sua família',
			src: segurosImage,
		},
	];
	return (
		<div className='px-4 w-full h-full py-20'>
			<div className='mx-auto max-w-7xl w-full flex flex-col  relative'>
				{features.map((f, index) => {
					return (
						<div
							id={f.id}
							key={index}
							className={`flex items-center gap-20 py-14  w-full h-full ${
								index == 1 && 'flex-row-reverse'
							}`}>
							<div className='flex flex-col gap-5 w-full'>
								<h2 className='text-3xl font-bold'>{f.title}</h2>
								<p className='text-balance text-lg'>{f.description}</p>
							</div>
							<div className='w-full z-20'>
								<Image
									src={f.src}
									alt={f.title}
									height={480}
									width={720}></Image>
							</div>
						</div>
					);
				})}
				<div className='absolute -right-40 -top-40 z-10'>
					<RetStairs />
				</div>
				<div className='absolute -left-72 top-40 z-10 rotate-180'>
					<RetStairs />
				</div>
				<div className='absolute left-[400px] top-80 z-10 scale-75'>
					<RetCrossDark />
				</div>
				<div className='absolute -left-[200px] bottom-64 z-10 scale-75'>
					<RetCrossDark />
				</div>
				<div className='absolute -right-[200px] bottom-64 z-10 '>
					<RetCuboidDark />
				</div>
			</div>
		</div>
	);
}
