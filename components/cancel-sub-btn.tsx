/** @format */

'use client';

import { useStripe } from '@/hooks/use-stripe';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function CancelSubBtn() {
	const [loading, setLoading] = useState(false);

	const { handleCreateStripePortal } = useStripe();

	const handleCancelSubscription = async () => {
		setLoading(true);
		handleCreateStripePortal();

		// try {
		// 	const response = await fetch('/api/cancel-sub', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	});

		// 	const data = await response.json();

		// 	tickets.map(async (item) => {
		// 		await deleteTicketsAction({ id: item.id });
		// 	});

		// 	if (!data.ok) {
		// 		toast.error('Erro ao cancelar assinatura', {
		// 			description: data.message,
		// 		});
		// 		console.log(data.message);
		// 	} else {
		// 		console.log('Assinatura cancelada:', data);
		// 		toast.success('Assinatura cancelada', { description: data.message });
		// 		router.refresh();
		// 	}

		// 	// Caso o cancelamento seja bem-sucedido
		// } catch (err) {
		// 	// Caso haja um erro
		// 	console.log(err);
		// 	toast.error(
		// 		'Erro ao cancelar assinatura. Entre em contato com o suporte',
		// 	);
		// } finally {
		// 	setLoading(false);
		// }
	};
	return (
		<Button
			variant={'destructive'}
			className='disabled:opacity-50 w-full'
			onClick={() => handleCancelSubscription()}
			disabled={loading}>
			{loading ? (
				<>
					Cancelar Assinatura
					<Loader2 className='animate-spin repeat-infinite' />
				</>
			) : (
				<>
					Cancelar Assinatura <ArrowRight className='scale-125' />
				</>
			)}
		</Button>
	);
}
