/** @format */

import BuyButton from '@/components/buy-button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { associate } from '@/constants/associate';
import { teleCouple, teleFamily, teleIndividual } from '@/constants/tele-plans';
import { CircleCheckBig, CircleOff } from 'lucide-react';

export default function ModalSub() {
	return (
		<div className='w-full h-full'>
			<Dialog defaultOpen={true}>
				<DialogContent className='max-w-7xl w-full h-full 2xl:h-fit overflow-scroll will-change-scroll 2xl:overflow-hidden'>
					<DialogHeader>
						<DialogTitle>Escolha Seu Plano</DialogTitle>
						<DialogDescription className='text-balance'>
							Temos diversas opções de benefícios para você e sua família
						</DialogDescription>
					</DialogHeader>{' '}
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
									<BuyButton
										size='default'
										priceType={'TELEMEDICINE_INDIVIDUAL'}
									/>
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
									<BuyButton
										size='default'
										priceType={'TELEMEDICINE_COUPLE'}
									/>
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
									<BuyButton
										size='default'
										priceType={'TELEMEDICINE_FAMILY'}
									/>
									<p className='text-xs italic text-muted-foreground text-center'>
										* Psicologia, Psiquiatria, Nutrição, Geriatria,
										Endocrinologia com limite de 2 consultas por mês
									</p>
								</CardFooter>
							</Card>
						</div>
					</div>
					<Card className='max-w-7xl mx-auto bg-white border-blue-400'>
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
							<BuyButton
								size='default'
								priceType={'CLUB_VANTAGES'}
							/>
						</CardFooter>
					</Card>
				</DialogContent>
			</Dialog>
		</div>
	);
}
