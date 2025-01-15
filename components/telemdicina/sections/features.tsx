/** @format */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { telemedicinefeatures } from '../../../constants/telemedicine-features';

export default function Features() {
	return (
		<div
			id='espec'
			className='max-w-7xl w-full items-center h-full flex mx-auto gap-20 justify-between z-10 py-10'>
			<div className='flex flex-col gap-10'>
				<div className='flex flex-col gap-5 items-center justify-center text-center'>
					<h2 className='font-semibold text-2xl lg:text-4xl md:text-balance capitalize leading-loose'>
						Principais Especialidades
					</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
						harum facilis saepe adipisci soluta doloremque
					</p>
				</div>
				<div className='grid md:grid-cols-3 gap-5'>
					{telemedicinefeatures.map((item, index) => {
						return (
							<Card
								key={index}
								className='hover:dark transition-all ease-linear duration-300 group border-none'>
								<CardHeader>
									<CardTitle className='flex gap-5 flex-col'>
										<item.icon className='group-hover:text-blue-400 text-blue-600 w-10 h-10' />
										{item.title}
									</CardTitle>
								</CardHeader>
								<CardContent className='font-light'>
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
