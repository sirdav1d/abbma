/** @format */

'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CancelSubBtn({
	planName,
	id,
}: {
	planName: string;
	id: string;
}) {
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleCancelSubscription = async () => {
		setLoading(true);

		try {
			const response = await fetch('/api/cancel-sub', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					planName: planName,
					id: id, // Aqui você substitui pelo nome do plano que o usuário deseja cancelar
				}),
			});

			const data = await response.json();

			if (!data.ok) {
				toast.error('Erro ao cancelar assinatura', {
					description: data.message,
				});
				console.log(data.message);
			} else {
				console.log('Assinatura cancelada:', data);
				toast.success('Assinatura cancelada', { description: data.message });
				router.refresh();
			}

			// Caso o cancelamento seja bem-sucedido
		} catch (err) {
			// Caso haja um erro
			console.log(err);
			toast.error(
				'Erro ao cancelar assinatura. Entre em contato com o suporte',
			);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Button
			variant={'destructive'}
			className='disabled:opacity-50 w-full'
			onClick={handleCancelSubscription}
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
