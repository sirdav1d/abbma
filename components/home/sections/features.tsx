/** @format */

import RetCrossDark from '@/assets/ret-cross-dark';
import RetCuboidDark from '@/assets/ret-cuboid-dark';
import RetStairs from '@/assets/ret-stairs';
import segurosImage from '@/assets/segurosImage.png';
import telemedicinaImage from '@/assets/telemedicinaImage.png';
import vantagensImage from '@/assets/vantagensImage.png';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import FeatureImage from '../../feature-image';
import BlurIn from '../../ui/blur-in';
import { Button } from '../../ui/button';
import { FadeText } from '../../ui/fade-text';
import Link from 'next/link';

export default function Features() {
	const features = [
		{
			title: 'Clube de Vantagens',
			id: 'club',
			description:
				'O clube de vantagens oferece descontos exclusivos em diversos segmentos, incluindo cursos gratuitos em todo o Brasil',
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
							className={`flex flex-col md:flex-row items-center gap-20 py-10  w-full h-full ${
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
										<Link href={'#price'}>
											Saiba mais
											<ArrowDown className='w-5 h-5 size-full scale-125' />
										</Link>
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
				<BlurIn className='absolute -left-72 top-40 z-10 rotate-180'>
					<RetStairs />
				</BlurIn>
				<BlurIn className='absolute left-[400px] top-80 z-10 scale-75'>
					<RetCrossDark />
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
