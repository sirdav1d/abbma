/** @format */

import RetCrossDark from '@/assets/ret-cross-dark';
import RetCuboidDark from '@/assets/ret-cuboid-dark';
import RetStairs from '@/assets/ret-stairs';
import telemedicinaImage from '@/assets/telemedicinaImage.png';
import vantagensImage from '@/assets/vantagensImage.png';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import FeatureImage from '../../feature-image';
import BlurIn from '../../ui/blur-in';
import { Button } from '../../ui/button';
import { FadeText } from '../../ui/fade-text';

export default function Features() {
	const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
	const features = [
		{
			title: 'Telemedicina',
			id: 'tele',
			description:
				'Com a telemedicina, você tem acesso a atendimento médico em qualquer hora do dia, além de poder contar com consultas em diversas especialidades',
			src: telemedicinaImage,
			link: `${baseUrl}/telemedicina`,
		},
		{
			title: 'Clube de Vantagens',
			id: 'club',
			description:
				'O clube de vantagens oferece descontos exclusivos em diversos segmentos, incluindo cursos gratuitos em todo o Brasil',
			src: vantagensImage,
			link: `https://abbma.clubeparcerias.com.br/`,
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
							className={`flex flex-col md:flex-row items-center gap-5 md:gap-20 py-10  w-full h-full ${
								index == 1 && 'md:flex-row-reverse'
							}`}>
							<div className='flex flex-col gap-5 w-full'>
								<FadeText
									framerProps={{
										show: { transition: { delay: 0.2 } },
									}}>
									<h2 className='text-3xl font-semibold text-slate-950'>
										{f.title}
									</h2>
								</FadeText>
								<FadeText
									framerProps={{
										show: { transition: { delay: 0.4 } },
									}}>
									<p className='text-balance text-lg text-slate-800'>
										{f.description}
									</p>
								</FadeText>
								<FadeText
									framerProps={{
										show: { transition: { delay: 0.4 } },
									}}>
									<Button
										asChild
										className='bg-blue-700 hover:bg-blue-600 font-semibold text-slate-50'>
										<a
											href={f.link}
											target='_blank'>
											Saiba mais
											<ArrowRight />
										</a>
									</Button>
								</FadeText>
							</div>
							<div className='w-full z-20'>
								<FeatureImage delay={index * 0.2}>
									<>
										<Image
											src={f.src}
											alt={f.title}
											height={480}
											width={720}></Image>
									</>
								</FeatureImage>
							</div>
						</div>
					);
				})}
				<BlurIn className='absolute -right-40 -top-40 z-10'>
					<RetStairs />
				</BlurIn>

				<BlurIn className='absolute invisible md:visible lg:-left-[200px] bottom-64 z-10 scale-75'>
					<RetCrossDark />
				</BlurIn>
				<BlurIn className='absolute -right-[200px] bottom-64 z-10 '>
					<RetCuboidDark />
				</BlurIn>
			</div>
		</div>
	);
}
