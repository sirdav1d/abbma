/** @format */

'use client';

import { useStripe } from '@/hooks/use-stripe';

import React from 'react';
import { Button } from './ui/button';
import { Wallet } from 'lucide-react';

export default function PortalBtn() {
	const { handleCreateStripePortal } = useStripe();
	return (
		<Button
			variant={'ghost'}
			className='w-full flex justify-start font-normal '
			onClick={handleCreateStripePortal}>
			<Wallet />
			Financeiro
		</Button>
	);
}
