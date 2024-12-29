/** @format */

import stripe from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { email, cpf, priceType } = await req.json();

	const priceAssociate = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

	const priceTeleIndividual =
		process.env.STRIPE_SUBSCRIPTION_TELEMEDICINE_INDIVIUAL_PRICE_ID;

	const priceTeleCouple =
		process.env.STRIPE_SUBSCRIPTION_TELEMEDICINE_COUPLE_PRICE_ID;

	const priceTeleFamily =
		process.env.STRIPE_SUBSCRIPTION_TELEMEDICINE_FAMILY_PRICE_ID;

	function getPrice(priceType: unknown) {
		if (priceType == 'CLUB_VANTAGES') {
			return priceAssociate;
		}

		if (priceType == 'TELEMEDICINE_INDIVIDUAL') {
			return priceTeleIndividual;
		}

		if (priceType == 'TELEMEDICINE_COUPLE') {
			return priceTeleCouple;
		}
		if (priceType == 'TELEMEDICINE_FAMILY') {
			return priceTeleFamily;
		}
	}

	const priceTypeId = getPrice(priceType);

	console.log(priceType);

	try {
		const customers = await stripe.customers.list({
			email: String(email),
		});

		const customer = customers.data[0];
		console.log(customer, customers, email);

		if (customer) {
			const subscriptions = await stripe.subscriptions.list({
				customer: customer.id,
				status: 'active',
			});

			const hasActiveSubscription = subscriptions.data.some((sub) =>
				sub.items.data.some((item) => item.price.id === priceTypeId),
			);

			if (hasActiveSubscription) {
				console.log('assinatura duplicada identificada');
				// 3. Se o cliente já tiver uma assinatura ativa, evitar nova criação
				return NextResponse.json({
					message: 'Este cliente já tem uma assinatura ativa para este plano.',
					ok: false,
					sessionId: null,
					priceId: null,
				});
			}
		}

		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: priceTypeId,
					quantity: 1,
				},
			],

			mode: 'subscription',
			payment_method_types: ['card'],
			success_url: `${req.headers.get('origin')}/success`,
			cancel_url: `${req.headers.get('origin')}/`,
			metadata: {
				email,
				cpf,
				priceType,
			},
			phone_number_collection: { enabled: true },
		});

		return NextResponse.json({
			sessionId: session.id,
			priceId: priceTypeId,
			ok: true,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.error();
	}
}
