/** @format */

import React from 'react';
import { FadeText } from '../ui/fade-text';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion';
import BlurIn from '../ui/blur-in';
import RetCrossDark from '@/assets/ret-cross-dark';
import RetStairs from '@/assets/ret-stairs';

export default function Faq() {
	const faq = [
		{
			question: 'Quais os principais benefícios oferecidos pela ABBMA?',
			answer:
				'Os principais benefícios incluem descontos em farmácias, restaurantes, lojas de pet, entretenimento, cursos gratuitos, descontos em telemedicina 24h e vantagens exclusivas em seguros e planos de saúde',
		},
		{
			question: 'Como funciona o Clube de Vantagens?',
			answer:
				'Por apenas R$6,99 o associado tem acesso ao Clube de Vantagens que oferece descontos exclusivos em parceiros de todo o Brasil, como farmácias, restaurantes, lojas, entretenimento, e muito mais.',
		},
		{
			question: 'Os benefícios da ABBMA incluem seguros?',
			answer:
				'Sim! A ABBMA oferece vantagens exclusivas em diversos tipos de seguros, como seguro de vida, carro, moto, residência, pet, viagem, e até mesmo seguros para obras e construção.',
		},
		{
			question: 'Posso incluir dependentes nos benefícios?',
			answer:
				'Sim, você pode incluir dependentes para aproveitar benefícios como telemedicina e planos de saúde',
		},
		{
			question: 'Os cursos gratuitos possuem certificado?',
			answer:
				'Sim, os cursos oferecidos possuem certificado, abrangendo áreas como idiomas, reforço escolar, gastronomia, preparação para o Enem, e muito mais.',
		},
		{
			question: 'Como solicito a ativação de um benefício?',
			answer:
				'Para ativar um benefício, basta abrir um chamado na nossa plataforma, e um operador fará o cadastro manualmente junto ao parceiro correspondente.',
		},
	];
	return (
		<div className='w-full px-4 '>
			<div className='mx-auto max-w-7xl py-20 items-center flex flex-col gap-10 relative lg:flex-row w-full'>
				<div className='md:w-1/2'>
					<BlurIn className='absolute -right-96 -top-56 scale-75'>
						<RetCrossDark />
					</BlurIn>
					<BlurIn className='absolute -left-40 top-5'>
						<RetStairs />
					</BlurIn>
					<FadeText framerProps={{ show: { transition: { delay: 0.2 } } }}>
						<h2 className='font-bold text-3xl lg:text-5xl max-w-2xl mx-auto'>
							Perguntas Frequentes
						</h2>
					</FadeText>
				</div>
				<div className='md:w-1/2'>
					<FadeText
						framerProps={{ show: { transition: { delay: 0.2 } } }}
						className='w-1/2'>
						{faq.map((f, index) => {
							return (
								<Accordion
									className='w-full'
									key={index}
									type='single'
									collapsible>
									<AccordionItem value={`item-${index}`}>
										<AccordionTrigger className='text-left'>
											{f.question}
										</AccordionTrigger>
										<AccordionContent>{f.answer}</AccordionContent>
									</AccordionItem>
								</Accordion>
							);
						})}
					</FadeText>
				</div>
			</div>
		</div>
	);
}
