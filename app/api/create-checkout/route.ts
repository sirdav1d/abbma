/** @format */

import { getUserAction } from '@/actions/user/get-user';
import { updateUserAction } from '@/actions/user/update-user';
import stripe from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { priceType, metadata, isAddOn } = await req.json();

	const priceAssociate = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

	const priceTeleIndividual =
		process.env.STRIPE_SUBSCRIPTION_TELEMEDICINE_INDIVIUAL_PRICE_ID;

	const priceTeleCouple =
		process.env.STRIPE_SUBSCRIPTION_TELEMEDICINE_COUPLE_PRICE_ID;

	const priceTeleFamily =
		process.env.STRIPE_SUBSCRIPTION_TELEMEDICINE_FAMILY_PRICE_ID;

	function getPrice(priceType: string | undefined): string {
		switch (priceType) {
			case 'CLUB_VANTAGES':
				return priceAssociate!;
			case 'TELEMEDICINE_INDIVIDUAL':
				return priceTeleIndividual!;
			case 'TELEMEDICINE_COUPLE':
				return priceTeleCouple!;
			case 'TELEMEDICINE_FAMILY':
				return priceTeleFamily!;
			default:
				throw new Error(`Tipo de preço inválido: ${priceType}`);
		}
	}

	const priceTypeId = getPrice(priceType);

	const userSession = await getServerSession();

	if (!userSession) {
		return NextResponse.json({
			message: 'Usuário não autenticado.',
			ok: false,
		});
	}

	const userEmail = userSession.user.email;
	const userName = userSession.user.name;

	const { user } = await getUserAction({ email: userEmail });

	let customerId;

	if (user?.customer_id) {
		customerId = user?.customer_id;
	}

	if (!user?.customer_id) {
		const newCustomer = await stripe.customers.create({
			email: userEmail,
			name: userName,
			metadata: {
				...metadata,
			},
		});

		await updateUserAction({
			user: { email: userEmail, customer_id: newCustomer.id },
		});

		customerId = newCustomer.id;
	}

	try {
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: [
				{
					price: priceTypeId,
					quantity: 1,
				},
			],

			mode: 'subscription',
			payment_method_types: ['card'],
			success_url: `${req.headers.get('origin')}/success`,
			cancel_url: `${req.headers.get('origin')}/dashboard`,
			metadata: {
				...metadata,
				priceTypeId,
				priceType,
				customerId,
				isAddOn,
			},
			phone_number_collection: { enabled: true },
			payment_method_collection: 'always',
		});

		return NextResponse.json({
			sessionId: session.id,
			priceId: priceTypeId,
			ok: true,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({
			message: 'Ocorreu um erro ao processar a solicitação.',
			ok: false,
		});
	}
}
