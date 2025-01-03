/** @format */

'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import stripe from '@/lib/stripe';
import { getServerSession } from 'next-auth'; // Supondo que você tenha essa função

export async function getSubscriptionsAction() {
	try {
		// Obter o usuário pelo email
		const session = await getServerSession(options);

		const customers = await stripe.customers.list({
			email: session?.user?.email,
		});

		if (customers.data.length === 0) {
			throw new Error('Cliente não encontrado no Stripe.');
		}

		const customer = customers.data[0];
		const subscriptions = await stripe.subscriptions.list({
			customer: customer.id,
			status: 'active', // Apenas assinaturas ativas
		});

		if (subscriptions.data.length === 0) {
			return { message: 'Nenhuma assinatura ativa encontrada.' };
		}

		return { subscriptions: subscriptions.data };
	} catch (error) {
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
