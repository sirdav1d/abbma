/** @format */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';
import { cpf } from 'zod-br-tax-id';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';


const formSchema = z.object({
	name: z.string().min(2, {
		message: 'O nome completo deve ter pelo menos 2 caracteres.',
	}),
	cpf: cpf(),
	date_birth: z.date({ required_error: 'A data de nascimento é obrigatória.' }),
	relationship: z.string({
		required_error: 'O grau de parentesco é obrigatório.',
	}),
	email: z.string().email({ message: 'E-mail inválido.' }),
	phone: z.string().regex(/^(\+?\d{1,3})?\s?\(?\d{2,3}\)?\s?\d{4,5}-?\d{4}$/, {
		message: 'O número de telefone celular não é válido',
	}),
	address: z
		.string()
		.min(5, { message: 'O endereço deve ter pelo menos 5 caracteres.' }),
	city: z
		.string()
		.min(2, { message: 'A cidade deve ter pelo menos 2 caracteres.' }),
	state: z
		.string()
		.length(2, { message: 'Use a sigla de 2 letras para o estado.' }),
	cep: z.string().length(8, { message: 'O CEP deve ter 8 dígitos.' }),
});

export default function DependentForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			cpf: '',
			date_birth: new Date(),
			relationship: '',
			email: '',
			phone: '',
			address: '',
			city: '',
			state: '',
			cep: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { name, relationship, date_birth } = values;
		console.log(name, relationship, date_birth);
	}
	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome Completo</FormLabel>
									<FormControl>
										<Input
											placeholder='Nome completo'
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
							name='date_birth'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
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
							name='relationship'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Grau de Parentesco</FormLabel>

									<FormControl>
										<Input
											placeholder='Grau de parentesco'
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
											placeholder='email@exemplo.com'
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
									<FormLabel>Telefone</FormLabel>
									<FormControl>
										<Input
											placeholder='(00) 00000-0000'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Endereço</FormLabel>
									<FormControl>
										<Input
											placeholder='Rua, número, complemento'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='city'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cidade</FormLabel>
									<FormControl>
										<Input
											placeholder='Cidade'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='state'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Estado</FormLabel>
									<FormControl>
										<Input
											placeholder='UF'
											maxLength={2}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='cep'
							render={({ field }) => (
								<FormItem>
									<FormLabel>CEP</FormLabel>
									<FormControl>
										<Input
											placeholder='00000-000'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						type='submit'
						className='w-full'>
						Adicionar Dependente
					</Button>
				</form>
			</Form>
		</div>
	);
}
