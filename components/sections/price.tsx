/** @format */

import { CircleCheckBig } from 'lucide-react';
import BuyModal from '../buy-modal';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { FadeText } from '../ui/fade-text';

export default function Price() {
	const associado = [
		'Desconto de até 60% em medicamentos em diversas farmácias',
		'Desconto de até 30% em diversos restaurantes em Delivery',
		'Desconto em produtos para  PET ',
		'Descontos em diversas Lojas',
		'Descontos em diversos seguros',
		'Descontos em telemedicina',
		'Descontos em Planos de Saúde',
		'Desconto de até 60% em cinema, teatro e shows',
		'Acesso a diversos cursos',
	];
	return (
		<div
			id='price'
			className='w-full h-full px-4 '>
			<div className='mx-auto max-w-7xl py-20'>
				<div className='flex flex-col items-center justify-center gap-5'>
					<FadeText
						framerProps={{
							show: { transition: { delay: 0.2 } },
						}}>
						<h2 className='text-3xl lg:text-5xl font-bold text-slate-950'>
							Seja um Associado
						</h2>
					</FadeText>
					<FadeText
						framerProps={{
							show: { transition: { delay: 0.4 } },
						}}>
						<p className='max-w-xl text-balance text-center text-slate-800'>
							Descubra um novo jeito de investir em sua saúde e bem-estar!
						</p>{' '}
					</FadeText>
				</div>
				<div className='mx-auto gap-5 mt-20'>
					<Card className='border-red-500 max-w-2xl mx-auto bg-slate-50'>
						<CardHeader>
							<CardTitle className='font-bold text-slate-950'>
								6,99 Mensais
							</CardTitle>
							<CardDescription className='text-red-500 font-semibold'>
								Seja Um Associado
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className='grid grid-cols-1 md:grid-cols-2  gap-3 w-full '>
								{associado.map((item, index) => {
									return (
										<li
											key={index}
											className='flex w-full gap-2 items-center text-slate-700 '>
											<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
											<span className='text-sm w-full'>{item}</span>
										</li>
									);
								})}
							</ul>
						</CardContent>
						<CardFooter className='w-full flex items-center justify-center'>
							<BuyModal full={true} />
						</CardFooter>
					</Card>
					{/* <Card className='border-blue-800'>
						<CardHeader>
							<CardTitle>24,99 Mensais</CardTitle>
							<CardDescription className='text-blue-800 font-semibold'>
								Telemedicina Individual
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className='flex flex-col gap-3 w-full'>
								{associado.map((item, index) => {
									return (
										<li
											key={index}
											className='flex w-full gap-2 items-center'>
											<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
											<span className='text-xs w-full'>{item}</span>
										</li>
									);
								})}
							</ul>
						</CardContent>
						<CardFooter>
							<Button className='bg-blue-800 w-full  hover:bg-blue-700 font-semibold '>
								Assinar <ArrowRight />
							</Button>
						</CardFooter>
					</Card>
					<Card className='border-blue-800'>
						<CardHeader>
							<CardTitle>44,99 Mensais</CardTitle>
							<CardDescription className='text-blue-800 font-semibold'>
								Telemedicina Casal{' '}
								<span className='text-xs text-muted-foreground'>
									(Até 2 pessoas)
								</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className='flex flex-col gap-3 w-full'>
								{associado.map((item, index) => {
									return (
										<li
											key={index}
											className='flex w-full gap-2 items-center'>
											<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
											<span className='text-xs w-full'>{item}</span>
										</li>
									);
								})}
							</ul>
						</CardContent>
						<CardFooter>
							<Button className='bg-blue-800 w-full  hover:bg-blue-700 font-semibold '>
								Assinar <ArrowRight />
							</Button>
						</CardFooter>
					</Card>
					<Card className='border-blue-800'>
						<CardHeader>
							<CardTitle>79,99 Mensais</CardTitle>
							<CardDescription className='text-blue-800 font-semibold'>
								Telemedicina Família{' '}
								<span className='text-xs text-muted-foreground'>
									(Até 4 pessoas)
								</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className='flex flex-col gap-3 w-full'>
								{associado.map((item, index) => {
									return (
										<li
											key={index}
											className='flex w-full gap-2 items-center'>
											<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
											<span className='text-xs w-full'>{item}</span>
										</li>
									);
								})}
							</ul>
						</CardContent>
						<CardFooter>
							<Button className='bg-blue-800 w-full  hover:bg-blue-700 font-semibold '>
								Assinar <ArrowRight />
							</Button>
						</CardFooter>
					</Card> */}
				</div>
			</div>
		</div>
	);
}
