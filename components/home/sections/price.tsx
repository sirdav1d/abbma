/** @format */

import { Button } from '@/components/ui/button';
import { associate } from '@/constants/associate';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import { getServerSession } from 'next-auth';
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
	const session = await getServerSession();
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
					<Card className='border-red-500 max-w-2xl mx-auto bg-slate-50'>
						<CardHeader>
							<CardTitle className='font-semibold text-slate-950'>
								6,99 Mensais
							</CardTitle>
							<CardDescription className='text-red-500 font-semibold'>
								Seja Um Associado
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className='grid grid-cols-1 md:grid-cols-2  gap-3 w-full '>
								{associate.map((item, index) => {
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
								<Button
									size='lg'
									asChild
									className='text-lg w-full bg-red-700 active:bg-red-600 hover:bg-red-600'>
									<Link href={'/register'}>
										Assinar <ArrowRight className='scale-125' />
									</Link>
								</Button>
							</CardFooter>
						)}
					</Card>
				</div>
			</div>
		</div>
	);
}
