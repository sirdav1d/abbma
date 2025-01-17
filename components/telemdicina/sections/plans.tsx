/** @format */

import BuyModal from '@/components/buy-modal';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FadeText } from '@/components/ui/fade-text';
import { CircleCheckBig, CircleOff } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react';
import { teleCouple, teleFamily, teleIndividual } from '@/constants/tele-plans';

export default async function Plans() {
	const session = await getServerSession();
	return (
		<div
			id='plans'
			className='max-w-7xl w-full items-center h-full flex mx-auto gap-10 justify-between z-10 py-10 flex-col'>
			<div className='flex flex-col w-full items-center justify-center gap-5 text-center mx-4 md:mx-0'>
				<FadeText
					framerProps={{
						show: { transition: { delay: 0.2 } },
					}}>
					<h2 className='text-3xl lg:text-4xl font-semibold  text-slate-950'>
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
			<div className='grid md:grid-cols-3 gap-5'>
				<Card className='max-w-2xl mx-auto bg-white border-blue-400'>
					<CardHeader>
						<CardTitle className='font-bold text-slate-950 '>
							24,99 Mensais
						</CardTitle>
						<CardDescription>Telemedicina Individual</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className='flex flex-col  gap-4 w-full '>
							{teleIndividual.habiltado.map((item, index) => {
								return (
									<li
										key={index}
										className='flex w-full gap-2 items-center text-slate-700 '>
										<CircleCheckBig className='text-green-500 w-5 h-5 size-full' />
										<span className='text-sm w-full'>{item}</span>
									</li>
								);
							})}
							{teleIndividual.inabilitado.map((item, index) => {
								return (
									<li
										key={index}
										className='flex w-full gap-2 items-center text-slate-700 '>
										<CircleOff className='text-red-600 w-5 h-5 size-full' />
										<span className='text-sm w-full'>{item}</span>
									</li>
								);
							})}
						</ul>
					</CardContent>
					<CardFooter className='w-full flex-col gap-5 flex items-center justify-center'>
						{!session?.user && <BuyModal full={true} />}
						<p className='text-xs italic text-muted-foreground text-center'>
							* Psicologia, Psiquiatria, Nutrição, Geriatria, Endocrinologia com
							limite de 2 sessões por mês
						</p>
					</CardFooter>
				</Card>
				<Card className='max-w-2xl mx-auto bg-white border-blue-400'>
					<CardHeader>
						<CardTitle className='font-bold text-slate-950 relative'>
							44,99 Mensais{' '}
							<span className='absolute bg-gradient-to-r from-blue-600 to-blue-800 w-fit p-3 font-normal h-fit text-sm text-white -top-10 -right-5 rounded-lg'>
								R$22,45 por pessoa
							</span>
						</CardTitle>
						<CardDescription className=''>
							Telemedicina Casal 2 Pessoas
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className='flex flex-col gap-4 w-full '>
							{teleCouple.habiltado.map((item, index) => {
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
					<CardFooter className='w-full flex-col gap-5 flex items-center justify-center'>
						{!session?.user && <BuyModal full={true} />}
						<p className='text-xs italic text-muted-foreground text-center'>
							* Psicologia, Psiquiatria, Nutrição, Geriatria, Endocrinologia com
							limite de 2 sessões por mês
						</p>
					</CardFooter>
				</Card>
				<Card className='max-w-2xl mx-auto bg-white border-blue-400'>
					<CardHeader>
						<CardTitle className='font-bold text-slate-950 relative'>
							79,99 Mensais{' '}
							<span className='absolute bg-gradient-to-r from-blue-600 to-blue-800 w-fit p-3 font-normal h-fit text-sm text-white -top-10 -right-5 rounded-lg'>
								R$19,99 por pessoa
							</span>
						</CardTitle>
						<CardDescription>Telemedicina Família 4 pessoas</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className='flex flex-col  gap-4 w-full '>
							{teleFamily.habiltado.map((item, index) => {
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
					<CardFooter className='w-full flex-col gap-5 flex items-center justify-center'>
						{!session?.user && <BuyModal full={true} />}
						<p className='text-xs italic text-muted-foreground text-center'>
							* Psicologia, Psiquiatria, Nutrição, Geriatria, Endocrinologia com
							limite de 2 sessões por mês
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
