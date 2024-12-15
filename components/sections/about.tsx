/** @format */

import logo from '@/assets/logo-principal.png';
import RetCrossDark from '@/assets/ret-cross-dark';
import Image from 'next/image';
import { FadeText } from '../ui/fade-text';
import BlurIn from '../ui/blur-in';

export default function About() {
	return (
		<div className='w-full h-full px-4 '>
			<div className='mx-auto max-w-7xl py-20 text-center justify-center items-center flex flex-col gap-10 relative '>
				<BlurIn className='absolute -left-56 bottom-5 scale-75'>
					<RetCrossDark />
				</BlurIn>
				<BlurIn className='absolute -right-40 -top-40'>
					<RetCrossDark />
				</BlurIn>
				<FadeText framerProps={{ show: { transition: { delay: 0.2 } } }}>
					<h2 className='font-bold text-3xl md:text-4xl max-w-2xl mx-auto'>
						Associação Brasileira de Benefícios para Militares e Autônomos
					</h2>
				</FadeText>
				<FadeText framerProps={{ show: { transition: { delay: 0.35 } } }}>
					<p className='max-w-2xl mx-auto leading-relaxed text-balance text-lg'>
						Na ABBMA, nosso compromisso é proporcionar aos seus associados e
						dependentes, acesso a uma{' '}
						<span className='font-bold'>ampla gama de benefícios</span>, através
						de parcerias privadas, que visam facilitar o{' '}
						<span className='font-bold'>bem-estar, educação e saúde,</span> além
						de oferecer vantagens financeiras, através de{' '}
						<span className='font-bold'>descontos e gratuidades</span>
					</p>
				</FadeText>
				<FadeText framerProps={{ show: { transition: { delay: 0.5 } } }}>
					<Image
						src={logo}
						alt='logo ABBMA'
						width={200}
						height={200}></Image>
				</FadeText>
			</div>
		</div>
	);
}
