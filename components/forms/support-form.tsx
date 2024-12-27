/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import sendSupportEmailAction from '@/actions/email/sac';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'O nome deve ter pelo menos 2 caracteres.',
	}),
	email: z.string().email({
		message: 'Por favor, insira um endereço de e-mail válido.',
	}),
	subject: z.string().min(5, {
		message: 'O assunto deve ter pelo menos 5 caracteres.',
	}),
	message: z.string().min(10, {
		message: 'A mensagem deve ter pelo menos 10 caracteres.',
	}),
});

export default function SupportForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			subject: '',
			message: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { name, email, subject, message } = values;
		const result = await sendSupportEmailAction({
			name,
			email,
			subject,
			message,
		});

		if (result?.success) {
			toast.success('Mensagem enviada', {
				description: `${result?.message}`,
			});
			form.reset();
		} else {
			toast.error('Erro ao enviar', {
				description: result.message,
			});
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center'>
					<Mail className='mr-2 h-6 w-6' />
					Contato com Suporte
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											placeholder='Seu nome'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											type='email'
											placeholder='email@email.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='subject'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Assunto</FormLabel>
									<FormControl>
										<Input
											placeholder='Assunto da mensagem'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mensagem</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Digite sua mensagem aqui'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							disabled={
								form.formState.isLoading ||
								form.formState.isSubmitting ||
								!form.formState.isValid
							}
							type='submit'
							className='w-full disabled:opacity-50'>
							Enviar Mensagem <ArrowRight />
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
