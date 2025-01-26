/** @format */

'use client';

import { useStripe } from '@/hooks/use-stripe';

import { Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { SidebarMenuButton } from './ui/sidebar';

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
		<SidebarMenuButton
			className='w-full flex justify-start items-center font-normal text-base md:text-sm hover:bg-primary hover:text-slate-50 px-2.5'
			onClick={handleClick}>
			<Wallet />
			Financeiro
		</SidebarMenuButton>
	);
}
