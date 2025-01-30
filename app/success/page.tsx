/** @format */

import Link from 'next/link';
import { CheckCircle, ArrowRight, Shield, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import logo from '@/assets/logo-principal.png';

export default function SuccessPage() {
	return (
		<div className='bg-slate-100'>
			<div className='container mx-auto px-4 py-10 max-w-7xl flex flex-col justify-center  w-full min-h-screen h-full '>
				<Link
					href='/homepage'
					className='mx-auto mb-5'>
					<Image
						src={logo}
						alt='logo ABBMA'
						width={120}
						height={120}></Image>
				</Link>
				<Card className='mb-8'>
					<CardHeader className='flex flex-col gap-3'>
						<div className='flex items-center justify-center mb-4'>
							<CheckCircle className='text-green-500 w-12 h-12' />
						</div>
						<CardTitle className='text-3xl lg:text-5xl font-bold text-center'>
							Obrigado por se tornar um associado!
						</CardTitle>
						<CardDescription className='text-center text-lg'>
							Sua assinatura foi confirmada e em breve seus benefícios estarão
							ativos.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-center'></p>
						<div className='flex justify-center'>
							<Button
								asChild
								size='lg'
								className='text-lg'>
								<Link href='/dashboard'>
									Área do Associado{' '}
									<ArrowRight className=' h-4 w-4 scale-150' />
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className='grid gap-6 md:grid-cols-2'>
					<Card>
						<CardHeader>
							<CardTitle className='text-xl font-semibold'>
								Próximos Passos
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ol className='list-decimal list-inside flex flex-col justify-between h-full  gap-5 text-sm'>
								<li>Acesse seu dashboard para ver todos os seus benefícios</li>
								<li>Complete seu perfil para personalizar sua experiência</li>
								<li>
									Explore o Clube de Vantagens para aproveitar descontos
									exclusivos
								</li>
								<li>
									Contrate um plano de Telemedinica com desconto e agende sua
									primeira consulta
								</li>
								<li>Contrate um plano de saúde com desconto</li>
								<li>Contrate um plano de seguros com desconto</li>
								<li>Adicione dependentes ao seu plano, se desejar</li>
							</ol>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-xl font-semibold'>
								Benefícios Disponíveis
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className='space-y-6'>
								<li className='flex  flex-col md:flex-row  md:items-center gap-3 p-3 rounded bg-slate-800 dark'>
									<Shield className='h-5 w-5 text-blue-400' />
									<div>
										<h3 className='font-medium text-foreground'>
											Clube de Vantagens
										</h3>
										<p className='text-sm text-muted-foreground'>
											Acesse descontos exclusivos em diversas lojas parceiras.
										</p>
									</div>
								</li>
								<li className='flex flex-col md:flex-row  md:items-center p-3 gap-3'>
									<Phone className='h-5 w-5 md:scale-150 text-green-500' />
									<div>
										<h3 className='font-medium'>Desconto em Telemedicina </h3>
										<p className='text-sm text-gray-600'>
											Acesso à descontos em planos de telemedicina com consultas
											online 24/7 para você e seus dependentes.
										</p>
									</div>
								</li>
								<li className='flex  flex-col md:flex-row  md:items-center gap-3 p-3'>
									<Heart className='h-5 w-5 text-red-500' />
									<div>
										<h3 className='font-medium'>
											Descontos em Planos de Saúde
										</h3>
										<p className='text-sm text-gray-600'>
											Acesso a planos de saúde com condições especiais.
										</p>
									</div>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
