/** @format */

import RetCrossDark from '@/assets/ret-cross-dark';
import BlurIn from '../../ui/blur-in';
import { FadeText } from '../../ui/fade-text';
import Image from 'next/image';

export default function About() {
	return (
		<div className='w-full h-full px-4 '>
			<div className='mx-auto max-w-7xl py-20 justify-center md:justify-start items-center flex flex-col md:flex-row gap-5 relative  '>
				<BlurIn className='absolute -left-96 bottom-5 scale-75'>
					<RetCrossDark />
				</BlurIn>
				<BlurIn className='absolute -right-40 -top-40'>
					<RetCrossDark />
				</BlurIn>
				<div className='flex flex-col w-full gap-5 items-start'>
					<FadeText framerProps={{ show: { transition: { delay: 0.2 } } }}>
						<h2 className='font-semibold text-3xl md:text-4xl max-w-2xl mx-auto text-slate-950'>
							Associação Brasileira de Benefícios para Militares e Autônomos
						</h2>
					</FadeText>
					<FadeText framerProps={{ show: { transition: { delay: 0.35 } } }}>
						<p className='max-w-2xl mx-auto leading-relaxed text-balance text-base text-slate-800'>
							Na ABBMA, nosso compromisso é proporcionar aos seus associados e
							dependentes, acesso a uma{' '}
							<span className='font-bold'>ampla gama de benefícios</span>,
							através de parcerias privadas, que visam facilitar o{' '}
							<span className='font-bold'>bem-estar, educação e saúde,</span>{' '}
							além de oferecer vantagens financeiras, através de{' '}
							<span className='font-bold'>descontos e gratuidades</span>
						</p>
					</FadeText>
				</div>
				<FadeText
					framerProps={{ show: { transition: { delay: 0.5 } } }}
					className='w-full'>
					<Image
						src={'/logo-principal.png'}
						alt='Logo ABBMA'
						width={280}
						height={280}></Image>
				</FadeText>
			</div>
		</div>
	);
}
