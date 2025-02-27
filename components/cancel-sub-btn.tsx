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
