/** @format */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'O nome deve ter pelo menos 2 caracteres.',
	}),
	relationship: z.string().min(3, {
		message: 'O nome deve ter pelo menos 3 caracteres.',
	}),
	date_birth: z
		.string()
		.optional() // Campo opcional
		.refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
			message: "A data deve estar no formato 'YYYY-MM-DD'.",
		}), // Valida o formato da data // Prisma aceita null
});

export default function DependentForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			relationship: '',
			date_birth: '',
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
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										placeholder='Nome do dependente'
										{...field}
									/>
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
								<FormLabel>Parentêsco</FormLabel>
								<FormControl>
									<Input
										placeholder='seu parentêsco com o dependente'
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
							<FormItem>
								<FormLabel>Data de Nascimento</FormLabel>
								<FormControl>
									<Input
										type='date'
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
						Adicionar
					</Button>
				</form>
			</Form>
		</div>
	);
}
