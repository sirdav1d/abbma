/** @format */

'use client';

import { deleteUserAction } from '@/actions/user/delete-user';
import { ArrowRight, Loader2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function DeleteAccountBtn() {
	const [loading, setLoading] = useState(false);

	const session = useSession();

	async function handleCancelSubscription() {
		setLoading(true);

		try {
			if (session.data?.user) {
				const response = await deleteUserAction(session.data.user.email);

				if (!response.ok) {
					toast.error('Erro ao excluir conta', {
						description: String(response.error),
					});
					console.log(response.message);
				} else {
					console.log('Conta Excluída:', response);
					toast.success('Conta Excluída', {
						description: response.message,
					});
					signOut({ redirect: true, callbackUrl: '/login' });
				}
			}

			// Caso o cancelamento seja bem-sucedido
		} catch (err) {
			// Caso haja um erro
			console.log(err);
			toast.error('Erro ao excluir conta. Entre em contato com o suporte', {
				description: `${err}`,
			});
			console.log();
		} finally {
			setLoading(false);
		}
	}
	return (
		<Button
			variant={'destructive'}
			className='disabled:opacity-50 w-full'
			onClick={() => handleCancelSubscription()}
			disabled={loading}>
			{loading ? (
				<>
					Excluir Conta
					<Loader2 className='animate-spin repeat-infinite' />
				</>
			) : (
				<>
					Excluir Conta <ArrowRight className='scale-125' />
				</>
			)}
		</Button>
	);
}
