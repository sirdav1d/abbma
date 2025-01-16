/** @format */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { telemedicineBenefits } from '../../../constants/telemedicine-benefits';
import BlurIn from '@/components/ui/blur-in';
import RetStairs from '@/assets/ret-stairs';
import RetCrossDark from '@/assets/ret-cross-dark';
import RetCuboidDark from '@/assets/ret-cuboid-dark';

export default function Benefits() {
	return (
		<div
			id='espec'
			className='max-w-7xl w-full items-center h-full flex mx-auto gap-20 justify-between z-10 py-10'>
			<div className='flex flex-col relative gap-10 mx-4 md:mx-0'>
				<BlurIn className='absolute -left-40 top-40 scale-75'>
					<RetStairs />
				</BlurIn>
				<BlurIn className='absolute left-[400px] top-80 scale-75'>
					<RetCrossDark />
				</BlurIn>
				<BlurIn className='absolute -right-[200px] bottom-64 '>
					<RetCuboidDark />
				</BlurIn>
				<div className='flex flex-col gap-5 items-center justify-center text-center'>
					<h2 className='font-semibold max-w-lg text-2xl lg:text-4xl md:text-balance capitalize md:leading-loose'>
						Por que Contratar Nosso Plano de Telemedicina?
					</h2>
				</div>
				<div className='grid md:grid-cols-3 gap-5 '>
					{telemedicineBenefits.map((item, index) => {
						return (
							<Card
								key={index}
								className={`hover:dark transition-all ease-linear duration-300 group     z-[1] border-none`}>
								<CardHeader>
									<CardTitle className='flex gap-5 flex-col'>
										<item.icon className='group-hover:text-blue-400 text-blue-600 w-10 h-10' />
										{item.title}
									</CardTitle>
								</CardHeader>
								<CardContent className='font-light text-sm md:text-base'>
									{item.description}
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
