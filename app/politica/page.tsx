/** @format */

import MobileHeader from '@/components/mobile-header';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import DektopHeader from '@/components/desktop-header';
import logo from '@/assets/logo-principal.png';
import Footer from '@/components/footer';

export default function Politica() {
	return (
		<div className='bg-slate-50 overflow-x-hidden w-full h-full'>
			<div className='relative flex flex-col'>
				<div className='flex z-50 px-4 py-5 items-center justify-between md:hidden'>
					<MobileHeader />
					<Link href='/'>
						<Image
							src={logo}
							alt='logo ABBMA'
							width={48}
							height={48}></Image>
					</Link>
				</div>
				<DektopHeader />
				<div className='max-w-7xl mx-auto w-full md:mt-20 px-4 py-14'>
					<div className='py-5 flex flex-col gap-5'>
						<h2 className='font-bold text-3xl md:text-5xl'>
							Política de Privacidade
						</h2>
						<p className='text-sm md:text-md text-balance'>
							<span className='font-bold'>
								ASSOCIAÇÃO BRASILEIRA DE BENEFÍCIOS PARA MILITARES E AUTÔNOMOS
								(ABBMA).
							</span>{' '}
							A ABBMA está comprometida com a proteção dos seus dados pessoais.
							Esta Política explica como coletamos, usamos e compartilhamos suas
							informações. Poderão ser associados da <strong>ABBMA</strong>{' '}
							todos os militares dos âmbitos, federal, estadual e municipal e os
							autônomos
						</p>
					</div>
					<Separator />
					<div className='py-5 flex flex-col gap-5'>
						<h3 className='font-bold text-xl md:text-3xl'>Dados Coletados</h3>
						<p className='text-sm md:text-md'>
							{' '}
							<span className='font-bold'>Navegação:</span> Cookies e Google
							Analytics
						</p>
					</div>
					<Separator />
					<div className='py-5 flex flex-col gap-5'>
						<h3 className='font-bold text-xl md:text-3xl'>Como Coletamos</h3>
						<ul className='text-sm md:text-md'>
							<li>Formulários de contato</li>
							<li>Cookies</li>
							<li>Google Analytics</li>
						</ul>
					</div>
					<Separator />
					<div className='py-5 flex flex-col gap-5'>
						<h3 className='font-bold text-xl md:text-3xl'>Finalidade</h3>
						<p className='text-sm md:text-md'>Utilizamos seus dados para:</p>
						<ul className='text-sm md:text-md'>
							<li>Atendimento ao cliente</li>
							<li>Melhorar sua experiência no site</li>
							<li>Análises de desempenho</li>
							<li>Processamento de compras</li>
						</ul>
					</div>
					<Separator />
					<div className='py-5 flex flex-col gap-5'>
						<h3 className='font-bold text-xl md:text-3xl'>
							Compartilhamento com Terceiros
						</h3>
						<p className='text-sm md:text-md'>
							Seus dados podem ser compartilhados com:
						</p>
						<ul className='text-sm md:text-md'>
							<li>
								<span className='font-bold'>Stripe e Mercado Pago:</span>{' '}
								Pagamentos
							</li>
							<li>
								<span className='font-bold'>Google:</span> Análises e desempenho
							</li>
						</ul>
					</div>
					<Separator />
					<div className='py-5 flex flex-col gap-5'>
						<h3 className='font-bold text-xl md:text-3xl'>
							Direitos do Usuário
						</h3>
						<ul className='text-sm md:text-md'>
							<li>Acessar, corrigir ou excluir seus dados</li>
							<li>Retirar seu consentimento</li>
						</ul>
						<p className='text-sm font-bold md:text-md'>Contato:</p>
						<ul className='text-sm md:text-md'>
							<li>
								<span className='font-bold'>E-mail:</span>{' '}
								luizfreitas@qrcontabilidade.com.br
							</li>
							<li>
								<span className='font-bold'>Telefone:</span> (21) 98650-8882{' '}
							</li>
						</ul>
					</div>
					<Separator />
					<div className='py-5 flex flex-col gap-5'>
						<h3 className='font-bold text-xl md:text-3xl'> Uso de Cookies</h3>
						<p className='text-sm text-balance md:text-md'>
							Utilizamos cookies para melhorar a experiência no site. Você pode
							gerenciar ou bloquear cookies no seu navegador
						</p>
					</div>
					<Separator />
					<div className='py-5 flex flex-col gap-5'>
						<h3 className='font-bold text-xl md:text-3xl'>Alterações</h3>
						<p className='text-sm md:text-md'>
							Esta Política pode ser atualizada a qualquer momento. Recomendamos
							que você revise periodicamente
						</p>
						<ul className='text-sm md:text-md'>
							<li>
								<span className='font-bold'>Endereço:</span> Rua Luiz Leopoldo
								Fernandes Pinheiro, 551 - Sala 1108, Niterói
							</li>
							<li>
								<span className='font-bold'>Contato:</span> (21) 98650-8882 |
								luizfreitas@qrcontabilidade.com.br
							</li>
						</ul>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
