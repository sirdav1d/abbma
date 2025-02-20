/** @format */

import BuyButton from '@/components/buy-button';
import { Star } from 'lucide-react';

export function UpgradePlanBanner() {
	return (
		<div className='bg-gradient-to-r from-indigo-500 to-blue-700 text-white rounded-lg p-5 shadow-lg w-fit  md:w-full flex flex-col gap-4'>
			<div className='flex items-center gap-4 md:gap-20 justify-between flex-col md:flex-row'>
				<div className='flex items-center gap-4 text-center space-x-4 flex-col md:flex-row'>
					<Star className='h-8 w-8 text-yellow-300' />
					<div className='flex flex-col items-center md:items-start gap-4'>
						<h3 className='text-lg font-semibold'>Faça Upgrade do Seu Plano</h3>
						<p className='text-sm opacity-90'>
							Adicione mais dependentes e aproveite benefícios do plano Família!
						</p>
					</div>
				</div>
				<div>
					<BuyButton
						size='sm'
						priceType={'TELEMEDICINE_FAMILY'}
						isAddOn={true}
						content={`Comprar Plano Família`}
					/>
				</div>
			</div>
		</div>
	);
}
