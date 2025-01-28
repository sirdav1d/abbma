/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { getUserAction } from '@/actions/user/get-user';
import { updateUserAction } from '@/actions/user/update-user';
import stripe from '@/lib/stripe';
import { handleSubscription } from '@/utils/stripe/handlesub';
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
					const priceTypeId = session?.metadata?.priceTypeId;
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

						const customers = await stripe.customers.list({ email });
						const customer = customers.data[0];

						//VALIDADO
						if (myUser.user && tickets.data) {
							await manageTickets(myUser?.user, tickets?.data, priceType);
							await sendInvoiceIfAvailable(session, email, name);
						}

						if (customer && priceTypeId) {
							// Garantir que o cliente tem um método de pagamento associado
							const paymentMethods = await stripe.paymentMethods.list({
								customer: customer.id,
								type: 'card', // Busque métodos de pagamento do tipo cartão
							});

							if (paymentMethods.data.length === 0) {
								throw new Error(
									'Nenhum método de pagamento está associado ao cliente.',
								);
							}

							const paymentMethodId = paymentMethods.data[0].id;

							await stripe.paymentMethods.attach(paymentMethodId, {
								customer: customer.id,
							});

							await stripe.customers.update(customer.id, {
								invoice_settings: {
									default_payment_method: paymentMethodId,
								},
							});

							const subscriptions = await stripe.subscriptions.list({
								customer: customer.id,
								status: 'active',
							});

							if (subscriptions.data.length > 0) {
								const activeSubscription = subscriptions.data[0];
								await stripe.subscriptions.cancel(activeSubscription.id);

								console.log(
									'Assinatura ativa cancelada:',
									activeSubscription.id,
								);
							}

							const result = await handleSubscription({
								email,
								priceTypeId,
							});

							console.log('Assinatura processada com sucesso:', result);

							return NextResponse.json({
								message: 'Evento processado.',
								ok: true,
							});
						}
						console.log('Assinatura não processada');
						break;
					}
				} else {
					break;
				}

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
