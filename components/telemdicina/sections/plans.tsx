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
import { CircleCheckBig } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react';
import { teleIndividual } from '@/constants/tele-plans';

export default async function Plans() {
	const session = await getServerSession();
	return (
		<div
			id='plans'
			className='max-w-7xl w-full items-center h-full flex mx-auto gap-20 justify-between z-10 py-10 flex-col'>
			<div className='flex flex-col w-full items-center justify-center gap-5 text-center'>
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
			<div className='grid md:grid-cols-3 gap-5'>
				<Card className='max-w-2xl mx-auto bg-slate-50'>
					<CardHeader>
						<CardTitle className='font-bold text-slate-950'>
							24,99 Mensais
						</CardTitle>
						<CardDescription className='font-semibold'>
							Telemedicina Individual
						</CardDescription>
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
						</ul>
					</CardContent>
					{!session?.user && (
						<CardFooter className='w-full flex items-center justify-center'>
							<BuyModal full={true} />
						</CardFooter>
					)}
				</Card>
				<Card className=' max-w-2xl mx-auto bg-slate-50'>
					<CardHeader>
						<CardTitle className='font-bold text-slate-950'>
							44,99 Mensais
						</CardTitle>
						<CardDescription className=' font-semibold'>
							Telemedicina Casal
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className='flex flex-col gap-4 w-full '>
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
						</ul>
					</CardContent>
					{!session?.user && (
						<CardFooter className='w-full flex items-center justify-center'>
							<BuyModal full={true} />
						</CardFooter>
					)}
				</Card>
				<Card className='max-w-2xl mx-auto bg-slate-50'>
					<CardHeader>
						<CardTitle className='font-bold text-slate-950'>
							79,99 Mensais
						</CardTitle>
						<CardDescription className=' font-semibold'>
							Telemedicina Família
						</CardDescription>
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
						</ul>
					</CardContent>
					{!session?.user && (
						<CardFooter className='w-full flex items-center justify-center'>
							<BuyModal full={true} />
						</CardFooter>
					)}
				</Card>
			</div>
		</div>
	);
}
