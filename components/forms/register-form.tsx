/** @format */

'use client';

import { createUserAction } from '@/actions/user/create';
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
import { ArrowRight, CalendarIcon, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { cpf } from 'zod-br-tax-id';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const formSchema = z
	.object({
		email: z.string().email(),
		name: z.string().min(8, { message: 'Escreva o nome completo' }),
		password: z
			.string()
			.min(4, { message: 'A senha deve conter no mínimo 4 dígitos' }),
		phone: z
			.string()
			.regex(/^(\+?\d{1,3})?\s?\(?\d{2,3}\)?\s?\d{4,5}-?\d{4}$/, {
				message: 'O número de telefone celular não é válido',
			}),
		is_militar: z.enum(['military', 'autonomous']),

		date_birth: z
			.string() // Campo opcional
			.refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
				message: "A data deve estar no formato 'YYYY-MM-DD'.",
			}),
		cpf: cpf(),
		confirmPass: z
			.string()
			.min(4, { message: 'A senha deve conter no mínimo 4 dígitos' }),
		terms: z.boolean().default(false),
	})
	.refine((data) => data.password === data.confirmPass, {
		message: 'As senhas não coincidem.',
		path: ['confirmPassword'],
	});

export default function RegisterForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
			cpf: '',
			phone: '',
			confirmPass: '',
			is_militar: 'military',
			date_birth: '',
			terms: false,
		},
	});

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { email, name, password, phone, cpf, is_militar, date_birth } =
			values;

		try {
			const response = await createUserAction({
				email,
				name,
				password,
				phone,
				cpf,
				isMilitary: is_militar,
				date_birth,
			});
			if (!response.success) {
				toast.error(response.message);
			} else {
				toast.success(response.message);
				await signIn('credentials', {
					email,
					password,
					redirect: false,
				});
				router.refresh();
			}
		} catch (error) {
			toast.error(`Algo deu errado - ${error}`);
		}
	}

	return (
		<Form {...form}>
			<Card className='bg-slate-50 w-full xl:max-w-xl'>
				<CardHeader>
					<CardTitle className='text-2xl'>Cadastrar</CardTitle>
					<CardDescription>
						Digite seus dados e se torne um associado
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-5'>
						<div className='h-full w-full grid md:grid-cols-2 gap-5'>
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
								name='cpf'
								render={({ field }) => (
									<FormItem>
										<FormLabel>CPF</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='000.000.000-00'
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
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telefone/Celular</FormLabel>
										<FormControl>
											<Input
												type='tel'
												placeholder='(00) 00000 0000'
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
							<FormField
								control={form.control}
								name='confirmPass'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirmar Senha</FormLabel>
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
						</div>
						<FormField
							control={form.control}
							name='date_birth'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Data de Nascimento</FormLabel>
									<FormControl>
										<div className='relative'>
											<CalendarIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
											<Input
												type='date'
												className='pl-8 w-full'
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='is_militar'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<FormLabel>Tipo de Usuário</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-1'>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='military' />
												</FormControl>
												<FormLabel className='font-normal'>Militar</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='autonomous' />
												</FormControl>
												<FormLabel className='font-normal'>Autônomo</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='terms'
							render={({ field }) => (
								<FormItem className='flex items-center md:items-end gap-3'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}></Checkbox>
									</FormControl>
									<FormLabel className='text-xs text-muted-foreground'>
										Eu concordo com os{' '}
										<Link
											href={'/politica'}
											className='text-foreground underline hover:text-red-600 transition-all ease-linear duration-200'>
											Termos de Serviço e a Política de Privacidade
										</Link>
									</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							disabled={
								form.formState.isLoading ||
								form.formState.isSubmitting ||
								!form.formState.isValid ||
								form.getValues('terms') == false
							}
							type='submit'
							className='w-full disabled:opacity-50'>
							{form.formState.isLoading || form.formState.isSubmitting ? (
								<>
									Cadastrar <Loader2 className='animae-spin' />
								</>
							) : (
								<>
									Cadastrar <ArrowRight />
								</>
							)}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className='mt-2 text-center flex text-sm gap-2 justify-center items-center w-full'>
						Já tem uma conta?{' '}
						<a
							href='/login'
							className='underline underline-offset-4 hover:text-red-600 transition-all ease-linear duration-200'>
							Entrar
						</a>
					</div>
				</CardFooter>
			</Card>
		</Form>
	);
}
