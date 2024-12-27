/** @format */

import SupportForm from '@/components/forms/support-form';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { faq } from '@/constants/faq';
import { ArrowRight, FileText, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function HelpPage() {
	return (
		<div className='mx-auto w-full max-w-7xl px-4 2xl:px-0  py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
				Tire Suas Dúvidas e Entre em Contato Conosco
			</h2>
			<div className='mt-10 flex flex-col gap-5'>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<HelpCircle className='mr-2 h-6 w-6' />
							Perguntas Frequentes
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Accordion
							type='single'
							collapsible
							className='w-full'>
							{faq.map((item, index) => (
								<AccordionItem
									value={`item-${index}`}
									key={index}>
									<AccordionTrigger className='text-left'>
										{item.question}
									</AccordionTrigger>
									<AccordionContent className='text-left text-balance'>
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
				</Card>
				<SupportForm />
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<FileText className='mr-2 h-6 w-6' />
							Termos de Uso e Política
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Button
							className='justify-start text-sm'
							asChild>
							<Link href={'/politica'}>
								Acessar Políticas <ArrowRight />
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
