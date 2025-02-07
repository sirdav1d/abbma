/** @format */

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Ticket } from '@prisma/client';
import CancelSubBtn from './cancel-sub-btn';
import { Button } from './ui/button';

export default async function CancelSubModal({
	tickets,
}: {
	tickets: Ticket[];
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'outline'}
					className='border-red-500 w-fit ml-auto text-red-500 hover:text-slate-50 hover:bg-red-600'>
					Cancelar Assinatura
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cancelar Benfícios</DialogTitle>
					<DialogDescription>Essa ação não pode ser desfeita</DialogDescription>
				</DialogHeader>
				<p>
					Tem certeza que deseja cancelar seu plano e perder todos os seus
					benefícicios?
				</p>
				<DialogFooter className='w-full '>
					{tickets && <CancelSubBtn tickets={tickets} />}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
