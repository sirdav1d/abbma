/** @format */

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export default function CTA() {
	return (
		<div className='max-w-7xl w-full items-center h-full flex mx-auto gap-20 justify-between z-10 py-40 relative'>
			<div className="bg-blue-900 absolute left-0 h-96 w-full rounded-3xl bg-[url('/blue-gradient-background-cta.jpg')]" />
			<div className='z-10 mx-10 text-slate-50 flex flex-col gap-5 w-1/2'>
				<h2 className='font-semibold text-2xl lg:text-4xl md:text-balance capitalize md:leading-loose'>
					Plano Corporativo
				</h2>
				<p>
					Os colaboradores terão acesso a{' '}
					<strong>teleconsulta 24h por dia 7 dias na semana</strong> e
					teleconsulta Especializada com agenda Médica com{' '}
					<strong>diversos especialistas</strong>, tudo isso sem sair do local
					de trabalho. <br />
					Nosso plano Corporativo inclui <strong>seguro de vida</strong> que
					protege a todos aqueles que fazem o{' '}
					<strong>melhor para sua empresa</strong>. Esses benefícios, trazem
					comodidade para o seu time, além de criar um{' '}
					<strong>ambiente saudável</strong> e atraente para todos.
				</p>
				<Button
					size={'lg'}
					className='w-fit text-lg'>
					Entre em contato com nosso consultor{' '}
					<ArrowRight className='scale-125' />
				</Button>
			</div>
		</div>
	);
}
