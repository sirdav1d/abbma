/** @format */

import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function UpgradePlanBanner() {
	return (
		<div className='bg-gradient-to-r from-indigo-500 to-blue-700 text-white rounded-lg p-6 shadow-lg w-full'>
			<div className='flex items-center gap-20 justify-between'>
				<div className='flex items-center space-x-4'>
					<Star className='h-8 w-8 text-yellow-300' />
					<div>
						<h3 className='text-lg font-semibold'>Faça Upgrade do Seu Plano</h3>
						<p className='text-sm opacity-90'>
							Adicione mais dependentes e aproveite benefícios exclusivos!
						</p>
					</div>
				</div>
				<Button
					asChild
					className='bg-red-700 hover:bg-red-600 '>
					<Link href='/dashboard'>
						Saiba mais <ArrowRight className='ml-1 h-4 w-4' />
					</Link>
				</Button>
			</div>
		</div>
	);
}
