/** @format */

'use client';

import { useStripe } from '@/hooks/use-stripe';

import React from 'react';
import { Button } from './ui/button';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

export default function PortalBtn() {
	const { handleCreateStripePortal } = useStripe();

	async function handleClick() {
		try {
			const resp = await handleCreateStripePortal();

			if (!resp?.ok) {
				toast.error('Algo deu errado, tente novamente');
			} else {
				toast.success('Abrindo Portal Financeiro');
			}
		} catch (error) {
			console.log(error);
			toast.error('Algo deu errado, tente novamente');
		}
	}

	return (
		<Button
			variant={'ghost'}
			className='w-full flex justify-start font-normal '
			onClick={handleClick}>
			<Wallet />
			Financeiro
		</Button>
	);
}
