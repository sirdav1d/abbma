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

import { ArrowRight, FileText, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function HelpPage() {
	const faqItems = [
		{
			question: 'Como funciona o Clube de Vantagens?',
			answer:
				'O Clube de Vantagens oferece descontos exclusivos em uma ampla rede de estabelecimentos parceiros, incluindo restaurantes, lojas, academias e muito mais. Basta apresentar seu cartão de membro ou usar o aplicativo para aproveitar os descontos.',
		},
		{
			question: 'Como agendar uma consulta de telemedicina?',
			answer:
				"Para agendar uma consulta de telemedicina, acesse a seção 'Telemedicina' no seu painel, escolha a especialidade desejada e selecione um horário disponível. Você receberá instruções para acessar a consulta online.",
		},
		{
			question: 'Posso incluir dependentes no meu plano?',
			answer:
				"Sim, você pode incluir dependentes no seu plano. Acesse a seção 'Dependentes' no seu painel e clique em 'Adicionar Dependente'. Preencha as informações necessárias e aguarde a confirmação da inclusão.",
		},
		{
			question: 'Como cancelar minha assinatura?',
			answer:
				'Para cancelar sua assinatura, entre em contato com nossa equipe de suporte através do formulário de contato ou pelo telefone 0800 123 4567. Faremos o possível para atender sua solicitação o mais rápido possível.',
		},
	];
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
							{faqItems.map((item, index) => (
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
