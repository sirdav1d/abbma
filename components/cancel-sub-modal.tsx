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

export default function CancelSubModal({
	planName,
	id,
}: {
	planName: string;
	id: string;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'outline'}
					className='border-red-500 w-full text-red-500 hover:text-slate-50 hover:bg-red-600'>
					Cancelar Assinatura
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cancelar {planName}</DialogTitle>
					<DialogDescription>Essa ação não pode ser desfeita</DialogDescription>
				</DialogHeader>
				<p>Tem certeza que deseja cancelar seu plano?</p>
				<DialogFooter className='w-full '>
					<CancelSubBtn
						planName={planName}
						id={id}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
