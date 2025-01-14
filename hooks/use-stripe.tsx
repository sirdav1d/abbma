/** @format */

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

export function useStripe() {
	const [stripe, setStripe] = useState<Stripe | null>(null);

	useEffect(() => {
		async function loadStripeAsync() {
			const stripeInstance = await loadStripe(
				process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!,
			);
			setStripe(stripeInstance);
		}

		loadStripeAsync();
	}, []);

	return stripe;
}
