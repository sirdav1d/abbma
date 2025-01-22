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
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(4, { message: 'A senha deve conter no mínimo 4 dígitos' }),
});

export default function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { email, password } = values;
		try {
			const response = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (response?.ok) {
				router.refresh();
				router.push('/');
				toast.success('Usuário Logado com sucesso');
			} else {
				toast.error('E-mail ou senha inválidos');
			}
		} catch (error) {
			console.log(error);
			toast.error('E-mail ou senha inválidos');
		} finally {
			form.reset();
		}
	}

	return (
		<Form {...form}>
			<Card className='bg-slate-50 xl:max-w-md w-full'>
				<CardHeader>
					<CardTitle className='text-2xl'>Entrar</CardTitle>
					<CardDescription>
						Digite seu e-mail e senha para entrar
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
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<div className='flex items-center'>
										<FormLabel>Senha</FormLabel>
										<a
											href='/forgot-password'
											className='ml-auto underline inline-block text-sm underline-offset-4 hover:underline hover:text-red-600 transition-all ease-linear duration-200'>
											Esqueceu sua senha?
										</a>
									</div>
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
							disabled={
								form.formState.isLoading ||
								form.formState.isSubmitting ||
								!form.formState.isValid
							}
							type='submit'
							className='w-full disabled:opacity-50'>
							{form.formState.isLoading || form.formState.isSubmitting ? (
								<>
									Entrar <Loader2 className='animae-spin' />
								</>
							) : (
								<>
									Entrar <ArrowRight />
								</>
							)}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className='mt-4 text-center flex text-sm gap-2 justify-center items-center w-full'>
						Não tem uma conta?{' '}
						<a
							href='/register'
							className='text-foreground underline hover:text-red-600 transition-all ease-linear duration-200'>
							Cadastrar
						</a>
					</div>
				</CardFooter>
			</Card>
		</Form>
	);
}
