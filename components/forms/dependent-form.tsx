/** @format */

'use client';

import { createDependentAction } from '@/actions/dependents/create';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

import { updateDependentAction } from '@/actions/dependents/update';
import { Dependent } from '@prisma/client';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'O nome completo deve ter pelo menos 2 caracteres.',
	}),
	cpf: cpf(),
	date_birth: z
		.string({ required_error: 'A data de nascimento é obrigatória' })
		.refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
			message: "A data deve estar no formato 'YYYY-MM-DD'.",
		}), // Valida o formato da data // Prisma aceita null
	degree: z.string({
		required_error: 'O grau de parentesco é obrigatório.',
		coerce: true,
	}),
	email: z.string().email({ message: 'E-mail inválido.' }),
	phone: z.string().regex(/^(\+?\d{1,3})?\s?\(?\d{2,3}\)?\s?\d{4,5}-?\d{4}$/, {
		message: 'O número de telefone celular não é válido',
	}),
});

export default function DependentForm({
	userId,
	user,
	isUpdating,
}: {
	userId: string;
	user: Partial<Dependent> | null;
	isUpdating: boolean;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user?.name || '',
			cpf: user?.cpf || '',
			date_birth: user?.date_birth || '',
			degree: user?.degree || '',
			email: user?.email || '',
			phone: user?.phone || '',
		},
	});

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const {
			name,
			degree,
			date_birth,

			cpf,
			email,

			phone,
		} = values;
		try {
			if (!isUpdating) {
				const response = await createDependentAction({
					cpf: cpf,
					date_birth: date_birth,
					degree: degree,
					email: email,
					name: name,

					phone: phone,

					userId: userId,
				});

				if (response.success) {
					toast.success('Dependente Cadastrado com sucesso');
					router.refresh();
					form.reset();
				} else {
					toast.error('Algo deu errado', { description: response.message });
				}
			} else {
				const response = await updateDependentAction({
					cpf: cpf,
					date_birth: date_birth,
					degree: degree,
					email: email,
					name: name,
					phone: phone,
					id: userId,
				});

				if (response.success) {
					toast.success('Dependente Atualizado com sucesso');
					router.refresh();
				} else {
					toast.error('Algo deu errado', { description: response.message });
				}
			}
		} catch (error) {
			toast.error('Algo deu errado');
			console.log(error);
		} finally {
			router.push('/dashboard/dependents');
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-2 w-full '>
				<div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4'>
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
										disabled={isUpdating}
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
						name='degree'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Grau de Parentesco</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecione o grau de parentesco' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='Cônjuge'>Cônjuge</SelectItem>
										<SelectItem value='Filho(a)'>Filho(a)</SelectItem>
										<SelectItem value='Pai/Mãe'>Pai/Mãe</SelectItem>
										<SelectItem value='Neto(a)'>Neto(a)</SelectItem>
										<SelectItem value='Irmã(o)'>Irmã(o)</SelectItem>
										<SelectItem value='Outro'>Outro</SelectItem>
									</SelectContent>
								</Select>
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
				</div>
				<Button
					type='submit'
					className='w-full'>
					{isUpdating ? (
						<>
							Atualizar Dependente <ArrowRight />
						</>
					) : (
						<>
							Adicionar Dependente <ArrowRight />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
