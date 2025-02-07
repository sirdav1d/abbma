/** @format */
'use client';

import { deleteDependentAction } from '@/actions/dependents/delete';
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
import { Dependent } from '@prisma/client';
import { ArrowRight, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ModalDeleteDependent({
	dependent,
}: {
	dependent: Dependent;
}) {
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	async function onSubmitDel(id: string) {
		setLoading(true);
		try {
			const response = await deleteDependentAction(id);
			console.log(response);
			if (!response.ok) {
				toast.error('Algo deu errado');
			} else {
				toast.success('Dependente deletado com sucesso');
				router.refresh();
			}
		} catch (error) {
			console.log(error);
			toast.error('Algo deu errado');
		} finally {
			setLoading(false);
			router.refresh();
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='destructive'
					size='sm'>
					<Trash2 className='h-4 w-4' />
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full flex flex-col justify-center rounded-xl py-5 max-w-sm xl:max-w-xl '>
				<DialogHeader>
					<DialogTitle>Deletar dependente</DialogTitle>
					<DialogDescription>
						Essa ação não poderá ser desfeita
					</DialogDescription>
				</DialogHeader>{' '}
				<p>Tem certeza que deseja excluir o dependente?</p>
				<DialogFooter>
					<Button
						disabled={loading}
						onClick={() => onSubmitDel(dependent.id)}
						variant={'destructive'}
						className='w-full disabled:opacity-50'>
						{loading ? (
							<>
								Excluir Dependente <Loader2 className='animate-spin' />
							</>
						) : (
							<>
								Excluir Dependente <ArrowRight />
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
