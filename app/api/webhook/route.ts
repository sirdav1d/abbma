/** @format */

import WelcomeEmailAction from '@/actions/email/welcome';
import { createUserAction } from '@/actions/user/create';
import stripe from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
	try {
		const body = await req.text();
		const signature = (await headers()).get('stripe-signature');

		if (!secret || !signature) {
			throw new Error('Missing secret or signature');
		}

		const event = stripe.webhooks.constructEvent(body, signature, secret);
		console.log(body);
		switch (event.type) {
			case 'checkout.session.completed':
				if (event.data.object.payment_status === 'paid') {
					console.log('Nova assinatura foi criada com sucesso');
					// pagagamento por cartão com sucesso
					const testeId = event.data.object.metadata?.testeId;
					console.log('pagamento por cartão com sucesso', testeId);
					const email = event.data.object.customer_details?.email;
					const phone = event.data.object.customer_details?.phone;
					const name = event.data.object.customer_details?.name;
					const password = Math.random().toString(36).slice(2);

					if (email && phone && name) {
						await createUserAction({ email, phone, name, password: password });
						await WelcomeEmailAction();
						console.log('Usuário criado');
					} else {
						console.log('Usuário não foi criado');
					}
				}

			case 'checkout.session.expired':
				if (event.data.object.payment_status === 'unpaid') {
					// O cliente saiu do checkout e expirou :(
					const testeId = event.data.object.metadata?.testeId;
					console.log('checkout expirado', testeId);
				}
				break;

			case 'customer.subscription.deleted':
				// O cliente cancelou o plano :(
				break;
		}

		return NextResponse.json({ result: event, ok: true });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				message: `Webhook error: ${error}`,
				ok: false,
			},
			{ status: 500 },
		);
	}
}
