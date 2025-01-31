/** @format */
'use client';

import { deleteUserAction } from '@/actions/user/delete-user';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { User } from '@prisma/client';
import { ArrowRight, Loader2, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ModalDeleteUser({ user }: { user: Partial<User> }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const session = useSession();

	if (!session) {
		router.push('/login');
		return;
	}

	async function onSubmitDel(email: string) {
		setLoading(true);
		try {
			const response = await deleteUserAction(email);
			console.log(response);
			if (!response.ok) {
				toast.error('Algo deu errado');
			} else {
				toast.success('Usuário deletado com sucesso');
				router.refresh();
			}
		} catch (error) {
			console.log(error);
			toast.error('Algo deu errado');
		} finally {
			setLoading(false);
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type='submit'
					variant='destructive'
					size='sm'>
					<Trash2 className='h-4 w-4' />
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full flex flex-col justify-center rounded-xl py-5 max-w-sm xl:max-w-xl'>
				<DialogHeader>
					<DialogTitle>Deletar usuário</DialogTitle>
					<DialogDescription className='text-balance'>
						Essa ação não poderá ser desfeita
					</DialogDescription>
				</DialogHeader>{' '}
				<p>Tem certeza que deseja excluir o usuário permanentemente?</p>
				<DialogFooter>
					<Button
						disabled={loading}
						onClick={() => onSubmitDel(user.email!)}
						variant={'destructive'}
						className='w-full disabled:opacity-50'>
						{loading ? (
							<>
								Excluir Usuário <Loader2 className='animate-spin' />
							</>
						) : (
							<>
								Excluir Usuário <ArrowRight />
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
