/** @format */

'use client';

import { useStripe } from '@/hooks/use-stripe';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { $Enums } from '@prisma/client';
import { useSession } from 'next-auth/react';

export default function BuyButton({
	priceType,
	size,
}: {
	size?: 'default' | 'sm' | 'lg' | 'icon';
	priceType: $Enums.TicketType;
}) {
	const { handleCreateStripeCheckout } = useStripe();
	const session = useSession();

	return (
		<Button
			size={size ?? 'lg'}
			className={`px-4 py-2 disabled:opacity-50 z-20 bg-red-700  w-full hover:bg-red-600 font-semibold text-base text-slate-50`}
			onClick={() =>
				handleCreateStripeCheckout({
					priceType: priceType,
					metadata: session.data?.user,
				})
			}>
			Assinar{' '}
			<ArrowRight
				size={40}
				className='scale-125'
			/>
		</Button>
	);
}
