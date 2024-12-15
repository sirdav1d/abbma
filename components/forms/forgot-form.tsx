/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	email: z.string().email(),
});

export default function ForgotForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<Card className='bg-slate-50'>
				<CardHeader>
					<CardTitle className='text-2xl'>Esqueci minha senha</CardTitle>
					<CardDescription>
						Digite seu e-mail abaixo e receba uma nova senha de acesso
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'>
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

						<Button
							type='submit'
							className='w-full'>
							Resetar Senha <ArrowRight />
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className='mt-4 text-center flex text-sm gap-2 justify-center items-center w-full'>
						Não tem uma conta?{' '}
						<a
							href='/register'
							className='underline underline-offset-4 '>
							Cadastrar
						</a>
					</div>
				</CardFooter>
			</Card>
		</Form>
	);
}
