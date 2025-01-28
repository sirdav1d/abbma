/** @format */

import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import CancelSubBtn from './cancel-sub-btn';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';

export default async function CancelSubModal() {
	const session = await getServerSession();

	if (!session) {
		redirect('/login');
	}

	const { data } = await GetAllTicketsAction({ email: session.user.email });
	console.log(data?.filter((item) => item.isActive));

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
					{data && <CancelSubBtn tickets={data} />}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
