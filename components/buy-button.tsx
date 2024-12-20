/** @format */

'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export default function BuyButton({ email }: { email: string }) {
	const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

	const router = useRouter();
	async function handleClick(email: string) {
		try {
			setIsCreatingCheckout(true);
			const checkoutResponse = await fetch('/api/create-checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			const stripeClient = await loadStripe(
				process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string,
			);

			if (!stripeClient) throw new Error('Stripe failed to initialize.');

			const { sessionId, message, ok } = await checkoutResponse.json();
			if (ok) {
				await stripeClient.redirectToCheckout({ sessionId });
			} else {
				toast.error(String(message));
				router.push('/sub-duplicate');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsCreatingCheckout(false);
		}
	}

	return (
		<Button
			size={'lg'}
			disabled={isCreatingCheckout}
			className={`px-4 py-2 disabled:opacity-50 z-20 bg-red-700  max-w-xs w-full hover:bg-red-600 font-semibold text-lg text-slate-50`}
			onClick={() => handleClick(email)}>
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
