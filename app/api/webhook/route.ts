/** @format */

import SendInvoiceLinkAction from '@/actions/email/invoice-link';
import { createTicketAction } from '@/actions/tickets/create-ticket';
import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { updateTicketAction } from '@/actions/tickets/update-ticket';
import { getUserAction } from '@/actions/user/get-user';
import { updateUserAction } from '@/actions/user/update-user';
import stripe from '@/lib/stripe';
import { $Enums } from '@prisma/client';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
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
						const resp = await updateUserAction({
							user: {
								isSubscribed: true,
								customer_id: customerId,
								email: email,
							},
						});

						console.log(resp);
						const myUser = await getUserAction(email);
						const tickets = await GetAllTicketsAction({ email: email });

						const customers = await stripe.customers.list({ email });
						const customer = customers.data[0];

						if (customer) {
							// Garantir que o cliente tem um método de pagamento associado
							const paymentMethods = await stripe.paymentMethods.list({
								customer: customer.id,
								type: 'card',
							});

							if (paymentMethods.data.length === 0) {
								// Solicitar que o cliente adicione um cartão
								console.log('Cliente não possui um cartão registrado.');
							} else {
								// Definir o primeiro cartão encontrado como o método de pagamento padrão
								const card = paymentMethods.data[0];

								await stripe.customers.update(customer.id, {
									invoice_settings: {
										default_payment_method: card.id,
									},
								});
								console.log(
									'Método de pagamento padrão atualizado para o cartão.',
								);
							}

							// Obter assinaturas ativas do cliente
							const subscriptions = await stripe.subscriptions.list({
								customer: customer.id,
								status: 'active',
							});

							const subscription = subscriptions.data[0];
							const subscriptionItemId = subscription.items.data[0].id;

							const updatedSubscription = await stripe.subscriptions.update(
								subscription.id,
								{
									items: [
										{
											id: subscriptionItemId,
											price: priceTypeId, // O novo plano (priceId)
										},
									],
								},
							);

							console.log(updatedSubscription.id + 'ID de plano atualizado');
							console.log(event.data.object.metadata);

							const sessionDetails = await stripe.checkout.sessions.retrieve(
								session.id,
								{ expand: ['line_items'] }, // Expande para obter os itens da sessão
							);
							const lineItems = sessionDetails.line_items?.data || [];
							const requestedPriceId = lineItems[0]?.price?.id;

							if (subscriptions.data.length > 1) {
								// Cancelar a assinatura vigente, se houver
								const activeSubscription =
									subscriptions.data[subscriptions.data.length - 1];
								const subscriptionId = activeSubscription.id;

								// Cancelar a assinatura anterior
								await stripe.subscriptions.cancel(subscriptionId);
								console.log(`Assinatura antiga cancelada: ${subscriptionId}`);

								// Criar uma nova assinatura com o novo plano
								if (requestedPriceId) {
									// Verifica se há faturas pendentes ou geradas para o cliente
									const invoices = await stripe.invoices.list({
										customer: customer.id,
										status: 'open',
									});

									if (invoices.data.length > 0) {
										const invoice = invoices.data[0];
										const invoiceUrl = invoice.hosted_invoice_url;

										if (email && invoiceUrl) {
											console.log(
												`Enviando fatura prorrata para ${email}: ${invoiceUrl}`,
											);
											await SendInvoiceLinkAction({
												email: email,
												link: invoiceUrl,
												name: name!,
												sub: 'Envio de fatura prorrata',
												message:
													'Atualizamos o seu plano e estamos te enviando a fatura referente ao cancelamento da assinatura anterior.',
											});
										}
									}
								}
								const oldTicket = tickets?.data?.find(
									(ticket) => ticket.type !== 'CLUB_VANTAGES',
								);

								console.log(oldTicket);

								if (oldTicket && myUser?.user && priceType) {
									await updateTicketAction({
										ticketId: oldTicket?.id,
										userId: myUser?.user?.id,
										type: priceType,
									});

									await updateUserAction({ user: { isSubscribed: true } });
									console.log('Plano Atualizado');
								}

								if (myUser?.user && priceType && !oldTicket) {
									let newTitle;

									if (priceType == 'TELEMEDICINE_INDIVIDUAL') {
										newTitle = 'Telemedicina Individual';
									}

									if (priceType == 'TELEMEDICINE_COUPLE') {
										newTitle = 'Telemedicina Casal';
									}

									if (priceType == 'TELEMEDICINE_FAMILY') {
										newTitle = 'Telemedicina Família';
									}
									await createTicketAction({
										userId: myUser?.user?.id,
										type: priceType,
										title: newTitle!,
									});

									console.log('Plano Criado');
								}
							}
						}

						if (tickets?.data?.length === 0) {
							await createTicketAction({
								title: 'Clube de Vantagens',
								type: 'CLUB_VANTAGES',
								userId: String(myUser?.user?.id),
							});
							console.log('Novo Ticket Criado - CLUB_VANTAGES');
							if (priceType === 'TELEMEDICINE_INDIVIDUAL') {
								await createTicketAction({
									title: 'Telemedicina Individual',
									type: 'TELEMEDICINE_INDIVIDUAL',
									userId: String(myUser?.user?.id),
								});
								console.log('Novo Ticket Criado - TELEMEDICINE_COUPLE');
							} else if (priceType === 'TELEMEDICINE_COUPLE') {
								await createTicketAction({
									title: 'Telemedicina Casal',
									type: 'TELEMEDICINE_COUPLE',
									userId: String(myUser?.user?.id),
								});
								console.log('Novo Ticket Criado - TELEMEDICINE_COUPLE');
							} else if (priceType === 'TELEMEDICINE_FAMILY') {
								await createTicketAction({
									title: 'Telemedicina Família',
									type: 'TELEMEDICINE_FAMILY',
									userId: String(myUser?.user?.id),
								});
								console.log('Novo Ticket Criado - TELEMEDICINE_FAMILY');
							}
						}

						const invoiceId = session.invoice as string;

						if (invoiceId) {
							const invoice = await stripe.invoices.retrieve(invoiceId);

							// Obter a URL da fatura
							const invoiceUrl = invoice.hosted_invoice_url;

							if (email && invoiceUrl) {
								console.log(`Enviando fatura para ${email}: ${invoiceUrl}`);
								await SendInvoiceLinkAction({
									email: email,
									link: invoiceUrl,
									name: name!,
								});
							}
						}
					} else {
						break;
					}

					// ID do cliente no Stripe

					// Recuperar informações adicionais da fatura ou pagamento
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
