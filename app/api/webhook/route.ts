/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { updateTicketAction } from '@/actions/tickets/update-ticket';
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
								email: email,
							},
						});

						const myUser = await getUserAction({ email: email });
						const tickets = await GetAllTicketsAction({ email: email });

						if (myUser.user) {
							await manageTickets(myUser?.user, tickets?.data, priceType);

							await sendInvoiceIfAvailable(session, email, name);
						}

						break;
					}
				} else {
					break;
				}
			case 'customer.subscription.updated':
				// Atualiza o plano no banco de dados

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const sessionUp = event.data.object as any;
				const quantity = sessionUp.quantity!;

				const customerId = sessionUp.customer;
				const customerResponse = await stripe.customers.retrieve(
					String(customerId),
				);

				const customer = customerResponse as Stripe.Customer;

				const email = customer.email;
				const name = customer.name;

				if (email && name) {
					await updateUserAction({
						user: {
							isSubscribed: true,
						},
					});

					const myUser = await getUserAction({ email: email });
					const tickets = await GetAllTicketsAction({ email: email });

					const ticket = tickets.data?.findLast(
						(item) => item.type !== 'CLUB_VANTAGES',
					);
					if (myUser.user && ticket) {
						await updateTicketAction({
							userId: myUser.user.id,
							ticketId: ticket.id,
							type: ticket.type,
							status: 'PENDING',
							quantity: quantity,
						});

						await sendInvoiceIfAvailable(sessionUp, email, name);
					}
				}

				break;

			case 'checkout.session.expired':
				if (event.data.object.payment_status === 'unpaid') {
					// O cliente saiu do checkout e expirou :(

					console.log('checkout expirado - cliente não pagou');
				}
				break;

			case 'customer.subscription.deleted':
				// O cliente cancelou o plano :(

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const sessionDel = event.data.object as any;

				const customerIdDel = sessionDel.customer;
				const customerResponseDel = await stripe.customers.retrieve(
					String(customerIdDel),
				);

				console.log('SESSION DELETE', customerResponseDel);
				// const emailDel = customerResponseDel.email;
				// const nameDel = customerResponseDel.name;

				// if (emailDel && nameDel) {
				// 	await updateUserAction({
				// 		user: {
				// 			isSubscribed: false,
				// 		},
				// 	});

				// 	const myUser = await getUserAction({ email: emailDel });
				// 	const tickets = await GetAllTicketsAction({ email: emailDel });

				// 	const ticket = tickets.data?.findLast(
				// 		(item) => item.type !== 'CLUB_VANTAGES',
				// 	);

				// 	if (myUser.user && ticket) {
				// 		const resp = await deleteTicketsAction({ id: ticket.id });
				// 		console.log(resp, tickets);
				// 		await sendInvoiceIfAvailable(sessionUp, emailDel, nameDel);
				// 	}
				// }

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
