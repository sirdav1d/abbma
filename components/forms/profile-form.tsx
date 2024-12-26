/** @format */

'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { updateUserAction } from '@/actions/user/update-user';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import {
	ArrowRight,
	Briefcase,
	CalendarIcon,
	CreditCard,
	Loader2,
	Lock,
	Mail,
	MapPin,
	Phone,
	Shield,
	UserIcon,
	UserRoundIcon,
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const profileFormSchema = z
	.object({
		name: z
			.string()
			.min(2, {
				message: 'O nome completo deve ter pelo menos 2 caracteres.',
			})
			.or(z.literal(''))
			.optional(),
		email: z.string().or(z.literal('')).optional(),
		phone: z
			.string()
			.min(10, {
				message: 'O telefone deve ter pelo menos 10 dígitos.',
			})
			.or(z.literal(''))
			.optional(),
		cpf: z.string().or(z.literal('')).optional(),
		date_birth: z
			.string()
			.optional() // Campo opcional
			.refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
				message: "A data deve estar no formato 'YYYY-MM-DD'.",
			}), // Valida o formato da data // Prisma aceita null
		address: z
			.string()
			.min(5, {
				message: 'O endereço deve ter pelo menos 5 caracteres.',
			})
			.or(z.literal(''))
			.optional(),
		neighborhood: z
			.string()
			.min(2, {
				message: 'O bairro deve ter pelo menos 2 caracteres.',
			})
			.or(z.literal(''))
			.optional(),
		city: z
			.string()
			.min(2, {
				message: 'A cidade deve ter pelo menos 2 caracteres.',
			})
			.or(z.literal(''))
			.optional(),
		state: z
			.string()
			.length(2, {
				message: 'Use a sigla de 2 letras para o estado.',
			})
			.or(z.literal(''))
			.optional(),
		cep: z
			.string()
			.length(8, {
				message: 'O CEP deve ter 8 dígitos.',
			})
			.or(z.literal(''))
			.optional(),
		is_militar: z.enum(['military', 'autonomous']),
		occupation: z.string().or(z.literal('')).optional(),
		currentPassword: z
			.string()
			.min(8, {
				message: 'A senha atual deve ter pelo menos 8 caracteres.',
			})
			.or(z.literal(''))
			.optional(),
		password: z
			.string()
			.min(8, {
				message: 'A nova senha deve ter pelo menos 8 caracteres.',
			})
			.or(z.literal(''))
			.optional(),
		confirmNewPassword: z
			.string()
			.min(8, {
				message:
					'A confirmação da nova senha deve ter pelo menos 8 caracteres.',
			})
			.or(z.literal(''))
			.optional(),
	})
	.refine((data) => data.password === data.confirmNewPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmNewPassword'],
	});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({ user }: { user: Partial<User> }) {
	const defaultValues: Partial<ProfileFormValues> = {
		name: user?.name || '',
		email: user?.email || '',
		phone: user?.phone || '',
		cpf: user?.cpf || '',
		date_birth: user?.date_birth || '',
		address: user?.address || '',
		neighborhood: user?.neighborhood || '',
		city: user?.city || '',
		state: user?.state || '',
		cep: user?.cep || '',
		is_militar: user?.is_militar ? 'military' : 'autonomous',
		occupation: user?.occupation || '',
		currentPassword: '',
		password: '',
		confirmNewPassword: '',
	};

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
	});

	async function onSubmit(data: ProfileFormValues) {
		let isMilitar;
		const id = user.id;

		if (data.is_militar == 'military') {
			isMilitar = true;
		} else {
			isMilitar = false;
		}
		try {
			const response = await updateUserAction({
				user: { ...data, is_militar: isMilitar, id: id },
			});
			console.log(response);
			if (!response.success) {
				toast.error(response.message);
			} else {
				toast.success('Perfil atualizado', { description: response.message });
				form.resetField('confirmNewPassword');
				form.resetField('password');
				form.resetField('currentPassword');
			}
		} catch (error) {
			console.log(error);
			toast.error('algo deu errado', { description: ` ${error}` });
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4'>
				<Tabs
					defaultValue='personal'
					className='w-full'>
					<TabsList className='grid w-full grid-cols-4 mb-2'>
						<TabsTrigger
							value='personal'
							className='flex gap-3'>
							<UserRoundIcon
								size={20}
								className='w-6 h-6 md:w-5 md:h-5'
							/>
							<span className='hidden md:inline'>Pessoal</span>
						</TabsTrigger>
						<TabsTrigger
							value='address'
							className='flex gap-3'>
							<MapPin
								size={20}
								className='w-6 h-6 md:w-5 md:h-5'
							/>
							<span className='hidden md:inline'>Endereço</span>
						</TabsTrigger>
						<TabsTrigger
							value='professional'
							className='flex gap-3'>
							<Briefcase
								size={20}
								className='w-6 h-6 md:w-5 md:h-5'
							/>
							<span className='hidden md:inline'>Profissional</span>
						</TabsTrigger>
						<TabsTrigger
							value='security'
							className='flex gap-3'>
							<Shield
								size={20}
								className='w-6 h-6 md:w-5 md:h-5'
							/>
							<span className='hidden md:inline'>Segurança</span>
						</TabsTrigger>
					</TabsList>
					<Card>
						<CardContent>
							<TabsContent
								value='personal'
								className='space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nome Completo</FormLabel>
												<FormControl>
													<div className='relative'>
														<UserIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															placeholder='Seu nome completo'
															className='pl-8'
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
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>E-mail</FormLabel>
												<FormControl>
													<div className='relative'>
														<Mail className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															disabled
															placeholder='seu@email.com'
															className='pl-8'
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
										name='phone'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Telefone</FormLabel>
												<FormControl>
													<div className='relative'>
														<Phone className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															placeholder='(00) 00000-0000'
															className='pl-8'
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
										name='cpf'
										render={({ field }) => (
											<FormItem>
												<FormLabel>CPF</FormLabel>
												<FormControl>
													<div className='relative'>
														<CreditCard className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															disabled
															placeholder='000.000.000-00'
															className='pl-8'
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
								</div>
							</TabsContent>
							<TabsContent
								value='address'
								className='space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='address'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Endereço</FormLabel>
												<FormControl>
													<div className='relative'>
														<MapPin className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															placeholder='Rua, número, complemento'
															className='pl-8'
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
										name='neighborhood'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Bairro</FormLabel>
												<FormControl>
													<Input
														placeholder='Seu bairro'
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
														placeholder='Sua cidade'
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
														type='text'
														placeholder='00000-000'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</TabsContent>
							<TabsContent
								value='professional'
								className='space-y-4'>
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
														<FormLabel className='font-normal'>
															Militar
														</FormLabel>
													</FormItem>
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem value='autonomous' />
														</FormControl>
														<FormLabel className='font-normal'>
															Autônomo
														</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{form.watch('is_militar') === 'autonomous' && (
									<FormField
										control={form.control}
										name='occupation'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Profissão</FormLabel>
												<FormControl>
													<div className='relative'>
														<Briefcase className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															placeholder='Sua profissão'
															className='pl-8'
															{...field}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</TabsContent>
							<TabsContent
								value='security'
								className='space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='currentPassword'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Senha Atual</FormLabel>
												<FormControl>
													<div className='relative'>
														<Lock className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															type='password'
															placeholder='Sua senha atual'
															className='pl-8'
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
										name='password'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nova Senha</FormLabel>
												<FormControl>
													<div className='relative'>
														<Lock className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															type='password'
															placeholder='Nova senha'
															className='pl-8'
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
										name='confirmNewPassword'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirmar Nova Senha</FormLabel>
												<FormControl>
													<div className='relative'>
														<Lock className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
														<Input
															type='password'
															placeholder='Confirme a nova senha'
															className='pl-8'
															{...field}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</TabsContent>{' '}
						</CardContent>
					</Card>
				</Tabs>
				<Button
					type='submit'
					className='w-full '>
					{form.formState.isLoading || form.formState.isSubmitting ? (
						<>
							Salvar Alterações <Loader2 className='animae-spin' />
						</>
					) : (
						<>
							Salvar Alterações <ArrowRight />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
