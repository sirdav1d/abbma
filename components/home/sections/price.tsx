/** @format */

import { Button } from '@/components/ui/button';
import { associate } from '@/constants/associate';
import { teleCouple, teleFamily, teleIndividual } from '@/constants/tele-plans';
import { ArrowRight, CircleCheckBig, CircleOff } from 'lucide-react';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../ui/card';
import { FadeText } from '../../ui/fade-text';

export default async function Price() {
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
						<h2 className='text-3xl lg:text-5xl font-semibold  text-slate-950'>
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
					<div className='max-w-7xl w-full items-center h-full flex mx-auto gap-5 justify-between z-10 flex-col '>
						<div className='grid md:grid-cols-3 gap-5'>
							<Card className='max-w-2xl mx-auto bg-white border-blue-400'>
								<CardHeader>
									<CardTitle className='font-bold text-slate-950 '>
										24,99 Mensais
									</CardTitle>
									<CardDescription>Telemedicina Individual</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className='flex flex-col  gap-2 w-full '>
										{teleIndividual.habiltado.map((item, index) => {
											return (
												<li
													key={index}
													className='flex w-full gap-2.5 items-center text-slate-700 '>
													<CircleCheckBig className='text-green-500 w-4 h-4 size-full' />
													<span className='text-xs w-full'>{item}</span>
												</li>
											);
										})}
										{teleIndividual.inabilitado.map((item, index) => {
											return (
												<li
													key={index}
													className='flex w-full gap-2 items-center text-slate-700 '>
													<CircleOff className='text-red-600 w-4 h-4 size-full' />
													<span className='text-xs w-full'>{item}</span>
												</li>
											);
										})}
									</ul>
								</CardContent>
								<CardFooter className='w-full flex-col gap-2.5 flex items-center justify-center'>
									<Button
										asChild
										className='w-full'>
										<Link href={'/register'}>
											Assinar <ArrowRight />
										</Link>
									</Button>
									<p className='text-xs italic text-muted-foreground text-center'>
										* Psicologia, Psiquiatria, Nutrição, Geriatria,
										Endocrinologia com limite de 2 consultas por mês
									</p>
								</CardFooter>
							</Card>
							<Card className='max-w-2xl mx-auto bg-white border-blue-400'>
								<CardHeader>
									<CardTitle className='font-bold text-slate-950 relative'>
										44,99 Mensais{' '}
										<span className='absolute bg-gradient-to-r from-blue-600 to-blue-800 w-fit p-3 font-medium h-fit text-sm text-white -top-10 -right-5 rounded-lg'>
											R$22,45 por pessoa
										</span>
									</CardTitle>
									<CardDescription className=''>
										Telemedicina Casal 2 Pessoas
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className='flex flex-col gap-2.5 w-full '>
										{teleCouple.habiltado.map((item, index) => {
											return (
												<li
													key={index}
													className='flex w-full gap-2 items-center text-slate-700 '>
													<CircleCheckBig className='text-green-500 w-4 h-4 size-full' />
													<span className='text-xs w-full'>{item}</span>
												</li>
											);
										})}
									</ul>
								</CardContent>
								<CardFooter className='w-full flex-col gap-2.5 flex items-center justify-center'>
									<Button
										asChild
										className='w-full'>
										<Link href={'/register'}>
											Assinar <ArrowRight />
										</Link>
									</Button>
									<p className='text-xs italic text-muted-foreground text-center'>
										* Psicologia, Psiquiatria, Nutrição, Geriatria,
										Endocrinologia com limite de 2 consultas por mês
									</p>
								</CardFooter>
							</Card>
							<Card className='max-w-2xl mx-auto bg-white border-blue-400'>
								<CardHeader>
									<CardTitle className='font-bold text-slate-950 relative'>
										79,99 Mensais{' '}
										<span className='absolute bg-gradient-to-r from-blue-600 to-blue-800 w-fit p-3 font-medium h-fit text-sm text-white -top-10 -right-5 rounded-lg'>
											R$19,99 por pessoa
										</span>
									</CardTitle>
									<CardDescription>
										Telemedicina Família 4 pessoas
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className='flex flex-col  gap-2.5 w-full '>
										{teleFamily.habiltado.map((item, index) => {
											return (
												<li
													key={index}
													className='flex w-full gap-2 items-center text-slate-700 '>
													<CircleCheckBig className='text-green-500 w-4 h-4 size-full' />
													<span className='text-xs w-full'>{item}</span>
												</li>
											);
										})}
									</ul>
								</CardContent>
								<CardFooter className='w-full flex-col gap-2.5 flex items-center justify-center'>
									<Button
										asChild
										className='w-full'>
										<Link href={'/register'}>
											Assinar <ArrowRight />
										</Link>
									</Button>
									<p className='text-xs italic text-muted-foreground text-center'>
										* Psicologia, Psiquiatria, Nutrição, Geriatria,
										Endocrinologia com limite de 2 consultas por mês
									</p>
								</CardFooter>
							</Card>
						</div>
					</div>
					<Card className='max-w-7xl mt-5 mx-auto bg-white border-red-400'>
						<CardHeader>
							<CardTitle className='font-bold text-slate-950 relative'>
								6,99 Mensais{' '}
							</CardTitle>
							<CardDescription>Clube de benefícios</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className='grid md:grid-cols-3 gap-2.5 md:gap-4 w-full '>
								{associate.map((item, index) => {
									return (
										<li
											key={index}
											className='flex w-full gap-2 items-center text-slate-700 '>
											<CircleCheckBig className='text-green-500 w-4 h-4 size-full' />
											<span className='text-xs w-fit'>{item}</span>
										</li>
									);
								})}
							</ul>
						</CardContent>
						<CardFooter className='w-full flex-col gap-5 flex items-center justify-center'>
							<Button
								asChild
								className='w-full'>
								<Link href={'/register'}>
									Assinar <ArrowRight />
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
