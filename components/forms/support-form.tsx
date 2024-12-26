/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Mail } from 'lucide-react';

export default function SupportForm() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center'>
					<Mail className='mr-2 h-6 w-6' />
					Contato com Suporte
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form className='space-y-4'>
					<div className='space-y-1'>
						<Label htmlFor='name'>Nome</Label>
						<Input
							id='name'
							placeholder='Seu nome'
						/>
					</div>
					<div className='space-y-1'>
						<Label htmlFor='email'>E-mail</Label>
						<Input
							id='email'
							type='email'
							placeholder='seu@email.com'
						/>
					</div>
					<div className='space-y-1'>
						<Label htmlFor='subject'>Assunto</Label>
						<Input
							id='subject'
							placeholder='Assunto da mensagem'
						/>
					</div>
					<div className='space-y-1'>
						<Label htmlFor='message'>Mensagem</Label>
						<Textarea
							id='message'
							placeholder='Digite sua mensagem aqui'
						/>
					</div>
					<Button
						type='submit'
						className='w-full'>
						Enviar Mensagem <ArrowRight />
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
