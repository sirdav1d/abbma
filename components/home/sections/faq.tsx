/** @format */

import React from 'react';
import { FadeText } from '../../ui/fade-text';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../../ui/accordion';
import BlurIn from '../../ui/blur-in';
import RetCrossDark from '@/assets/ret-cross-dark';
import RetStairs from '@/assets/ret-stairs';
import { faq } from '@/constants/faq';

export default function Faq() {
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
						<h2 className='font-semibold text-3xl lg:text-5xl max-w-2xl mx-auto text-slate-950'>
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
									<AccordionItem value={`item-${index} `}>
										<AccordionTrigger className='text-left text-slate-800'>
											{f.question}
										</AccordionTrigger>
										<AccordionContent className='text-slate-800'>
											{f.answer}
										</AccordionContent>
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
