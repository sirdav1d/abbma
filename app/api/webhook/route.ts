/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { getUserAction } from '@/actions/user/get-user';
import { updateUserAction } from '@/actions/user/update-user';
import stripe from '@/lib/stripe';
import { manageTickets } from '@/utils/stripe/manage-tickets';
import { sendInvoiceIfAvailable } from '@/utils/stripe/send-invoice';
import { $Enums } from '@prisma/client';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
	try {
		const body = await req.text();
		const signature = (await headers()).get('stripe-signature');

		if (!secret || !signature) {
			throw new Error('Missing secret or signature');
		}

		const event = stripe.webhooks.constructEvent(body, signature, secret);

		switch (event.type) {
			case 'checkout.session.completed':
				const session = event.data.object as Stripe.Checkout.Session;

				if (!session.customer) {
					return NextResponse.json(
						{ error: 'Sessão sem cliente associado.' },
						{ status: 400 },
					);
				}

				if (session.payment_status === 'paid') {
					console.log('Nova assinatura foi criada com sucesso');
					// pagagamento por cartão com sucesso

					const email = session.customer_details?.email;
					const name = session.customer_details?.name;
					const priceType = session?.metadata?.priceType as $Enums.TicketType;
					const customerId = session.metadata?.customerId;

					if (email && name && customerId) {
						await updateUserAction({
							user: {
								isSubscribed: true,
								customer_id: customerId,
							},
						});

						const myUser = await getUserAction({ email: email });
						const tickets = await GetAllTicketsAction({ email: email });

						//VALIDADO
						if (myUser.user) {
							const resp = await manageTickets(
								myUser?.user,
								tickets?.data,
								priceType,
							);
							console.log(resp);
							await sendInvoiceIfAvailable(session, email, name);
						}

						// if (customer && priceTypeId) {
						// 	//alterar ou criar o plano manualmente
						// 	const result = await handleSubscription({
						// 		email,
						// 		priceTypeId,
						// 	});

						// 	console.log('Assinatura processada com sucesso:', result);

						// 	return NextResponse.json({
						// 		message: 'Evento processado.',
						// 		ok: true,
						// 	});
						// }

						break;
					}
				} else {
					break;
				}
			case 'customer.subscription.updated':
				// Atualiza o plano no banco de dados

				break;

			case 'checkout.session.expired':
				if (event.data.object.payment_status === 'unpaid') {
					// O cliente saiu do checkout e expirou :(

					console.log('checkout expirado - cliente não pagou');
				}
				break;

			case 'customer.subscription.deleted':
				// O cliente cancelou o plano :(
				break;
		}

		return NextResponse.json({
			result: event,
			ok: true,
			status: 200,
			message: 'Deu tudo certo - webhook rodando',
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			message: `Webhook error: ${error}`,
			ok: false,
			status: 500,
			result: null,
		});
	}
}
