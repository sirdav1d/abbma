/** @format */

import stripe from '@/lib/stripe'; // Configuração da biblioteca Stripe
import { getServerSession } from 'next-auth'; // Função para obter sessão/autenticação do cliente
import { NextRequest, NextResponse } from 'next/server';
import { options } from '../auth/[...nextauth]/options';
import deleteTicketsAction from '@/actions/tickets/delete-ticket';
// import { updateSubscriptionStatus } from '@/lib/db'; // Função para atualizar o status no banco

export async function POST(req: NextRequest) {
	try {
		// Autenticar o usuário
		const session = await getServerSession(options);
		if (!session || !session.user) {
			return NextResponse.json({
				message: 'Usuário não autenticado.',
				ok: false,
				status: 401,
			});
		}

		const { email } = session?.user;

		const { id } = await req.json();
		await deleteTicketsAction({ id: id });

		if (!email) {
			return NextResponse.json({
				message: 'Email do usuário não encontrado.',
				ok: false,
				status: 400,
			});
		}

		const customers = await stripe.customers.list({
			email,
		});

		if (customers.data.length === 0) {
			return NextResponse.json({
				message: 'Cliente não encontrado.',
				ok: false,
				status: 404,
			});
		}

		const customerId = customers.data[0].id;

		const subscriptions = await stripe.subscriptions.list({
			customer: customerId,
			limit: 1, // Pegar apenas a primeira assinatura
			status: 'active',
		});

		if (subscriptions.data.length === 0) {
			return NextResponse.json({
				message: 'Nenhuma assinatura ativa encontrada para este usuário.',
				ok: false,
				status: 404,
			});
		}
		const subscription = subscriptions.data[0]; // Apenas uma assinatura será encontrada

		// Cancelar a assinatura imediatamente
		await stripe.subscriptions.cancel(subscription.id);

		return NextResponse.json({
			status: 200,
			message: `Plano ${subscription.id} cancelado com sucesso`,
			ok: true,
			// Retornando a assinatura cancelada
		});
	} catch (error) {
		console.error('Erro ao cancelar a assinatura:', error);
		return NextResponse.json({
			message: 'Erro ao cancelar a assinatura.',
			status: 500,
			ok: false,
		});
	}
}
