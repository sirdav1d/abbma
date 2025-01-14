/** @format */

'use client';

import WelcomeEmailAction from '@/actions/email/welcome';
import createAgenteAction from '@/actions/user/create-agente';
import { Button } from '@/components/ui/button';
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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const formSchema = z.object({
	email: z.string().email(),
	name: z.string().min(8, { message: 'Escreva o nome completo' }),

	phone: z.string().regex(/^(\+?\d{1,3})?\s?\(?\d{2,3}\)?\s?\d{4,5}-?\d{4}$/, {
		message: 'O número de telefone celular não é válido',
	}),
	cpf: z.string(),
	role: z.enum(['CLIENT', 'ADMIN', 'AGENT']),
});

export default function RegisterAgentForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			role: 'AGENT',
			name: '',
			cpf: '',
			phone: '',
		},
	});

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { email, name, phone, cpf, role } = values;

		try {
			const response = await createAgenteAction({
				agent: {
					email,
					name,
					phone,
					role,
					cpf,
				},
			});
			const resp = await WelcomeEmailAction({ email, name });
			console.log(resp);
			if (!response.success) {
				toast.error(response.message);
			} else {
				toast.success(response.message);
				form.reset();
				router.refresh();
			}
		} catch (error) {
			toast.error(`Algo deu errado - ${error}`);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-3'>
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
					name='role'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='role'
								className='text-slate-900'>
								Cargo
							</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='text-black'>
										<SelectValue placeholder='Selecione um cargo' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value={'AGENT'}>Atendente</SelectItem>
									<SelectItem value={'ADMIN'}>Administrador</SelectItem>
								</SelectContent>
							</Select>
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
							Cadastrar <Loader2 className='animate-spin' />
						</>
					) : (
						<>
							Cadastrar <ArrowRight />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
