/** @format */
'use client';

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
		if (!data.url) {
			return { ok: false, message: 'Algo deu errado' };
		}
		window.location.href = data.url;
		return { ok: true };
	}

	async function handleCreateStripeCheckout({
		priceType,
		metadata,
	}: {
		priceType: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		metadata: any;
	}) {
		try {
			const response = await fetch('/api/create-checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ priceType, metadata }),
			});

			const data = await response.json();
			await stripe?.redirectToCheckout({ sessionId: data.sessionId });
		} catch (error) {
			console.log(error);
		}
	}

	return { stripe, handleCreateStripePortal, handleCreateStripeCheckout };
}
