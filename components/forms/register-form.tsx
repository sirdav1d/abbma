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
	name: z.string().min(8, { message: 'Escreva o nome completo' }),
	password: z
		.string()
		.min(4, { message: 'A senha deve conter no mínimo 4 dígitos' }),
	tel: z
		.string()
		.regex(
			/^(\+?\d{1,3})?\s?\(?\d{2,3}\)?\s?\d{4,5}-?\d{4}$/,
			'O número de telefone celular não é válido',
		),
});

export default function RegisterForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
			tel: '',
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
					<CardTitle className='text-2xl'>Cadastrar</CardTitle>
					<CardDescription>
						Digite seus dados e se torne um associado
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome Completo</FormLabel>
									<FormControl>
										<Input
											type='text'
											placeholder='Nome Completo'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='tel'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefone/Celular</FormLabel>
									<FormControl>
										<Input
											type='text'
											placeholder='99 99999 9999'
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
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='********'
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
							Entrar <ArrowRight />
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className='mt-4 text-center flex text-sm gap-2 justify-center items-center w-full'>
						Já tem uma conta?{' '}
						<a
							href='/login'
							className='underline underline-offset-4 '>
							Entrar
						</a>
					</div>
				</CardFooter>
			</Card>
		</Form>
	);
}
