/** @format */

import SendInvoiceLinkAction from '@/actions/email/invoice-link';
import WelcomeEmailAction from '@/actions/email/welcome';
import { createUserWithPaymentAction } from '@/actions/user/create-with-payment';
import stripe from '@/lib/stripe';
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
					const phone = session.customer_details?.phone;
					const name = session.customer_details?.name;
					const password = Math.random().toString(36).slice(2);

					if (email && phone && name) {
						await createUserWithPaymentAction({
							email,
							phone,
							name,
							password: password,
						});
						console.log('Usuário criado');
						await WelcomeEmailAction({ email, name, password });
						console.log('E-mail de bem vindo enviado');
					} else {
						console.log('Usuário não foi criado');
					}

					// ID do cliente no Stripe

					// Recuperar informações adicionais da fatura ou pagamento
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
