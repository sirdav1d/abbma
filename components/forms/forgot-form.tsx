/** @format */

'use client';

import RecoveryPassAction from '@/actions/email/recovery-password';
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';

import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { email } = values;

		try {
			const resp = await RecoveryPassAction({ email });
			

			if (resp.ok) {
				toast.success('E-mail de recuperação de senha enviado');
				router.push('/login');
				form.reset();
			} else {
				toast.error('Algo deu errado');
			}
		} catch (error) {
			console.log(error);
			toast.error('Algo deu errado');
		}
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		
	}

	return (
		<Form {...form}>
			<Card className='bg-slate-50 xl:max-w-md w-full'>
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
						<Dialog>
							<DialogTrigger asChild>
								<Button
									disabled={
										form.formState.isLoading ||
										form.formState.isSubmitting ||
										!form.formState.isValid
									}
									className='w-full disabled:opacity-50'>
									Resetar Senha <ArrowRight />
								</Button>
							</DialogTrigger>
							<DialogContent className='sm:max-w-md'>
								<DialogHeader>
									<DialogTitle>Tem certeza?</DialogTitle>
								</DialogHeader>
								Essa ação não poderá ser desfeita, caso deseje prosseguir,
								clique no botão abaixo para resetar sua senha.
								<DialogFooter className='sm:justify-start'>
									<DialogClose asChild>
										<Button
											disabled={
												form.formState.isLoading ||
												form.formState.isSubmitting ||
												!form.formState.isValid
											}
											onClick={() =>
												onSubmit({ email: String(form.getValues('email')) })
											}
											type='submit'
											className='w-full disabled:opacity-50'>
											{form.formState.isLoading ||
											form.formState.isSubmitting ? (
												<>
													Resetar Senha Agora{' '}
													<Loader2 className='animae-spin' />
												</>
											) : (
												<>
													Resetar Senha Agora <ArrowRight />
												</>
											)}
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</form>
				</CardContent>
				<CardFooter>
					<div className='mt-4 text-center flex text-sm gap-2 justify-center items-center w-full'>
						Não tem uma conta?{' '}
						<a
							href='/register'
							className='underline underline-offset-4 hover:text-red-600 transition-all ease-linear duration-200 '>
							Cadastrar
						</a>
					</div>
				</CardFooter>
			</Card>
		</Form>
	);
}
