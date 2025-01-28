/** @format */

import app1 from '@/assets/app1.jpeg';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CTA() {
	return (
		<div className='max-w-7xl w-full items-center h-full flex mx-auto gap-20 justify-between z-10 py-10 xl:px-10 m-10  relative'>
			<div className="bg-blue-900 absolute left-0 h-full w-full xl:rounded-3xl bg-[url('/blue-gradient-background-cta.jpg')]" />
			<div className='z-10 mx-4 xl:mx-10 text-slate-50 flex flex-col gap-5 w-full md:w-1/2'>
				<h2 className='font-semibold text-3xl xl:text-4xl md:text-balance capitalize md:leading-loose'>
					Plano Corporativo
				</h2>
				<p>
					Os Colaboradores terão acesso a{' '}
					<strong>Teleconsulta 24h por dia, 7 dias por semana</strong> e
					consultas agendadas com diversos especialistas, tudo isso,{' '}
					<strong>sem sair do local de trabalho.</strong> <br />
					<br />
					Nosso plano Corporativo inclui <strong>seguro de vida</strong> que
					protege a todos aqueles que fazem o{' '}
					<strong>melhor para sua empresa</strong>. Esses benefícios, trazem
					comodidade para o seu time, além de criar um{' '}
					<strong>ambiente saudável</strong> e atraente para todos.
				</p>
				<Button
					asChild
					size={'lg'}
					className='w-fit xl:text-lg bg-red-700 hover:bg-red-600 active:bg-red-600'>
					<a
						href='https://wa.me/5521986508882?text=Ol%C3%A1%2C%20estava%20navegando%20no%20seu%20site%20e%20preciso%20de%20ajuda'
						rel='noopener noreferrer'
						target='_blank'>
						Entre em contato com nosso consultor
						<ArrowRight className='scale-125' />
					</a>
				</Button>
			</div>
			<div className='absolute right-10'>
				<Image
					src={app1}
					width={1200}
					height={880}
					alt='Imagem app madicar'
					className='object-contain max-w-[480px] invisible lg:visible'></Image>
			</div>
		</div>
	);
}
