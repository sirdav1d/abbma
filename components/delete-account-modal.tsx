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
import DeleteAccountBtn from './delete-account-btn';
export default function DeleteAccountModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'outline'}
					className='border-red-500 ml-auto text-red-500 hover:text-slate-50 hover:bg-red-600'>
					Excluir Conta
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Excluir Conta Permanentemente</DialogTitle>
					<DialogDescription>Essa ação não pode ser desfeita</DialogDescription>
				</DialogHeader>
				<p>Tem certeza que deseja cancelar sua Conta?</p>
				<DialogFooter className='w-full '>
					<DeleteAccountBtn  />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
