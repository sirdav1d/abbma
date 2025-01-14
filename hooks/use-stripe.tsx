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

	async function handleCreateStripePortal() {
		const response = await fetch('/api/create-portal', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();
		window.location.href = data.url;
	}

	return { stripe, handleCreateStripePortal };
}
