/** @format */
'use client';

import { manageUserAction } from '@/actions/user/manage-user';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface FormManageProps {
	user: Partial<User>;
}

export default function FormManage({ user }: FormManageProps) {
	const formSchema = z.object({
		email: z.string().email(),
		name: z.string().min(2, {
			message: 'O nome completo deve ter pelo menos 2 caracteres.',
		}),
		role: z.enum(['CLIENT', 'ADMIN', 'AGENT']),
	});

	const [isPending, setIsPending] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: user?.email,
			name: user?.name,
			role: user?.role,
		},
	});

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsPending(true);
			const email = values.email;
			const name = values.name;
			const role = values.role;

			await manageUserAction({
				user: { email, name, role },
			});
			form.reset();
			toast.success('Usuário Atualizado - 200', {
				description: `${name} - Usuário atualizado no banco de dados`,
			});
			router.refresh();
		} catch (error) {
			console.log(error);
			toast.error('Algo deu errado - 500', {
				description: 'Tente novamente',
			});

			setIsPending(false);
		}
		setIsPending(false);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='name'
								className='text-slate-900'>
								Nome
							</FormLabel>
							<FormControl>
								<Input
									id='name'
									{...field}
									placeholder='Nome do usuário'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel
								htmlFor='email'
								className='text-slate-900'>
								E-mail
							</FormLabel>
							<FormControl>
								<Input
									id='email'
									type='email'
									{...field}
									placeholder='E-mail do usuário'
								/>
							</FormControl>
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
									<SelectItem value={'CLIENT'}>Cliente</SelectItem>
									<SelectItem value={'ADMIN'}>Administrador</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>

				<Button
					disabled={isPending}
					type='submit'
					className='w-full'>
					{isPending ? (
						<>
							Atualizar
							<Loader2 className='animate-spin' />
						</>
					) : (
						<>
							Atualizar
							<ArrowRight />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
