/** @format */

import stripe from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const session = await getServerSession();
	const email = session?.user.email;

	if (!email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const customers = await stripe.customers.list({
		email: email,
	});

	const customer = customers.data[0];

	if (!customer) {
		return NextResponse.json(
			{ error: 'Cliente não encontrado' },
			{ status: 404 },
		);
	}

	try {
		const portalSession = await stripe.billingPortal.sessions.create({
			customer: customer.id,
			return_url: `${req.headers.get('origin')}/dashboard`,
		});

		return NextResponse.json({ url: portalSession.url });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: 'Internal error creating portal session' },
			{ status: 500 },
		);
	}
}
