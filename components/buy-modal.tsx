/** @format */
'use client';

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
import BuyButton from './buy-button';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

export default function BuyModal({ full = false }: { full: boolean }) {
	const [emailState, setEmailState] = useState<FormDataEntryValue | null>('');
	const [cpfState, setCpfState] = useState<FormDataEntryValue | null>('');
	const [show, setShow] = useState(false);

	function OnSubmit(data: FormData) {
		const email = data.get('email');
		const cpf = data.get('cpf');
		setEmailState(email);
		setCpfState(cpf);
		setShow(true);
		console.log({ emailState, cpfState });
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'lg'}
					className={`px-4 py-2 disabled:opacity-50 z-20 bg-red-700   w-full  hover:bg-red-600 font-semibold text-lg text-slate-50 ${
						full ? 'max-w-full' : 'max-w-xs'
					}`}>
					Assinar
					<ArrowRight
						size={40}
						className='scale-125'
					/>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Digite seu E-mail</DialogTitle>
					<DialogDescription>
						Após a confirmação de seu e-mail, você será direcionado para a
						página de pagamento.
					</DialogDescription>
				</DialogHeader>
				{show ? (
					<DialogFooter className='flex justify-center items-center w-full'>
						<BuyButton
							email={String(emailState)}
							cpf={String(cpfState)}
							priceType={'CLUB_VANTAGES'}
						/>
					</DialogFooter>
				) : (
					<form
						action={OnSubmit}
						className='flex flex-col gap-3'>
						<div className='space-y-1'>
							<Label>E-mail</Label>
							<Input
								name='email'
								type='email'
								placeholder='email@email.com'></Input>
						</div>
						<div className='space-y-1'>
							<Label>CPF</Label>
							<Input
								name='cpf'
								type='text'
								placeholder='000.000.000-00'></Input>
						</div>
						<Button
							type='submit'
							className='mt-2'>
							Enviar
						</Button>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
