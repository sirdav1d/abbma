/** @format */

import stripe from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { testeId } = await req.json();

	const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

	try {
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: price,
					quantity: 1,
				},
			],

			mode: 'subscription',
			payment_method_types: ['card'],
			success_url: `${req.headers.get('origin')}/success`,
			cancel_url: `${req.headers.get('origin')}/`,
			metadata: {
				testeId,
			},
			phone_number_collection: { enabled: true },
		});

		return NextResponse.json({ sessionId: session.id });
	} catch (err) {
		console.error(err);
		return NextResponse.error();
	}
}
