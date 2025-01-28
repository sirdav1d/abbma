/** @format */

import stripe from '@/lib/stripe';

interface handleSubscriptionProps {
	email: string;
	priceTypeId: string;
}

export async function handleSubscription({
	email,
	priceTypeId,
}: handleSubscriptionProps) {
	try {
		// Buscar cliente pelo e-mail
		const customers = await stripe.customers.list({ email });
		const customer = customers.data[0];

		if (!customer) {
			console.log('Cliente não encontrado, criando uma nova assinatura...');
			return await createNewSubscription({ email, priceTypeId });
		}

		// Buscar assinaturas ativas do cliente
		const subscriptions = await stripe.subscriptions.list({
			customer: customer.id,
			status: 'active',
		});

		if (subscriptions.data.length === 0) {
			console.log(
				'Nenhuma assinatura ativa encontrada, criando uma nova assinatura...',
			);
			return await createNewSubscription({ email, priceTypeId });
		}

		// Assinatura ativa encontrada
		const activeSubscription = subscriptions.data[0];
		const currentPlan = activeSubscription.items.data[0].price.id;

		if (currentPlan === priceTypeId) {
			console.log(
				'Plano vigente é igual ao solicitado, adicionando mais uma compra...',
			);
			const resp = await incrementQuantity(activeSubscription.items.data[0].id);
			return { message: 'adicionando mais uma compra', resp };
		} else {
			console.log(
				'Plano vigente é diferente, atualizando para o novo plano...',
			);
			const resp = await updatePlan(activeSubscription.id, priceTypeId);
			return { message: 'atualizando plano', resp };
		}
	} catch (error) {
		console.error('Erro ao processar a assinatura:', error);
		throw error;
	}
}

// Criar uma nova assinatura
async function createNewSubscription({
	email,
	priceTypeId,
}: handleSubscriptionProps) {
	try {
		const customers = await stripe.customers.list({ email });
		const customer = customers.data[0];

		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: [{ price: priceTypeId }],
			expand: ['latest_invoice.payment_intent'],
		});

		console.log('Nova assinatura criada:', subscription.id);
		return subscription;
	} catch (error) {
		console.log('Erro ao criar nova assinatura:', error);
		throw error;
	}
}

// Incrementar a quantidade do plano vigente
async function incrementQuantity(subscriptionItemId: string) {
	try {
		const subscriptionItem =
			await stripe.subscriptionItems.retrieve(subscriptionItemId);

		const newQuantity = (subscriptionItem.quantity || 0) + 1;

		const updatedSubscriptionItem = await stripe.subscriptionItems.update(
			subscriptionItemId,
			{
				quantity: newQuantity,
			},
		);

		console.log(
			`Quantidade do plano incrementada: de ${subscriptionItem.quantity} para ${newQuantity}`,
		);

		return updatedSubscriptionItem;
	} catch (error) {
		console.error('Erro ao incrementar a quantidade do plano:', error);
		throw error;
	}
}

// Atualizar plano para um novo
async function updatePlan(subscriptionId: string, priceTypeId: string) {
	try {
		const updatedSubscription = await stripe.subscriptions.update(
			subscriptionId,
			{
				items: [
					{
						id: subscriptionId,
						price: priceTypeId,
					},
				],
			},
		);

		console.log('Plano atualizado com sucesso:', updatedSubscription.id);
		return updatedSubscription;
	} catch (error) {
		console.error('Erro ao atualizar o plano:', error);
		throw error;
	}
}

module.exports = { handleSubscription };
