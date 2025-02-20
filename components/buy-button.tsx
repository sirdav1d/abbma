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
	isAddOn = false,
	content,
}: {
	size?: 'default' | 'sm' | 'lg' | 'icon';
	priceType: $Enums.TicketType;
	isAddOn?: boolean;
	content?: string;
}) {
	const { handleCreateStripeCheckout, handleCreateStripePortal } = useStripe();
	const session = useSession();

	function handleClick(isAddOn: boolean) {
		if (isAddOn) {
			handleCreateStripePortal();
		} else {
			handleCreateStripeCheckout({
				priceType: priceType,
				metadata: session.data?.user,
				isAddOn: isAddOn,
			});
		}
	}
	return (
		<Button
			size={size ?? 'lg'}
			className={`px-4 py-2 disabled:opacity-50 z-20 bg-red-700  w-full hover:bg-red-600 font-semibold text-base text-slate-50`}
			onClick={() => handleClick(isAddOn)}>
			{content ?? (
				<>
					Assinar{' '}
					<ArrowRight
						size={40}
						className='scale-110'
					/>
				</>
			)}
		</Button>
	);
}
