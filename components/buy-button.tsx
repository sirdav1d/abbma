/** @format */

'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function BuyButton({ full }: { full: boolean }) {
	const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

	async function handleClick(testeId: string) {
		try {
			setIsCreatingCheckout(true);
			const checkoutResponse = await fetch('/api/create-checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ testeId }),
			});

			const stripeClient = await loadStripe(
				process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string,
			);

			if (!stripeClient) throw new Error('Stripe failed to initialize.');

			const { sessionId } = await checkoutResponse.json();
			await stripeClient.redirectToCheckout({ sessionId });
		} catch (error) {
			console.error(error);
		} finally {
			setIsCreatingCheckout(false);
		}
	}

	return (
		<Button
			size={'lg'}
			disabled={isCreatingCheckout}
			className={`px-4 py-2 disabled:opacity-50 z-20 bg-red-700  max-w-xs w-full ${
				full && 'w-full max-w-full'
			}  hover:bg-red-600 font-semibold text-lg`}
			onClick={() => handleClick('123')}>
			{isCreatingCheckout ? (
				<>
					Assinar <Loader2 className='animate-spin' />
				</>
			) : (
				<>
					Assinar{' '}
					<ArrowRight
						size={40}
						className='scale-125'
					/>
				</>
			)}
		</Button>
	);
}
