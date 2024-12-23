/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Briefcase,
	CalendarIcon,
	CreditCard,
	Mail,
	MapPin,
	Phone,
	User,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const profileFormSchema = z.object({
	fullName: z.string().min(2, {
		message: 'O nome completo deve ter pelo menos 2 caracteres.',
	}),
	email: z.string().email({
		message: 'Por favor, insira um endereço de e-mail válido.',
	}),
	phone: z.string().min(10, {
		message: 'O telefone deve ter pelo menos 10 dígitos.',
	}),
	cpf: z.string().length(11, {
		message: 'O CPF deve ter 11 dígitos.',
	}),
	birthDate: z.date({
		message: 'Data de aniversário é obrigatório',
	}),
	address: z.string().min(5, {
		message: 'O endereço deve ter pelo menos 5 caracteres.',
	}),
	neighborhood: z.string().min(2, {
		message: 'O bairro deve ter pelo menos 2 caracteres.',
	}),
	city: z.string().min(2, {
		message: 'A cidade deve ter pelo menos 2 caracteres.',
	}),
	state: z.string().length(2, {
		message: 'Use a sigla de 2 letras para o estado.',
	}),
	zipCode: z.string().length(8, {
		message: 'O CEP deve ter 8 dígitos.',
	}),
	userType: z.enum(['military', 'autonomous']),
	profession: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
	fullName: '',
	email: '',
	phone: '',
	cpf: '',
	birthDate: new Date(),
	address: '',
	neighborhood: '',
	city: '',
	state: '',
	zipCode: '',
	userType: 'military',
	profession: '',
};

export default function ProfilePage() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
	});

	function onSubmit(data: ProfileFormValues) {
		toast('Perfil atualizado', {
			description: 'Suas informações foram salvas com sucesso.',
		});
		console.log(data);
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>Seu Perfil</CardTitle>
					<CardDescription>
						Gerencie suas informações pessoais e preferências.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8'>
							<Tabs
								defaultValue='personal'
								className='w-full'>
								<TabsList className='grid w-full grid-cols-3'>
									<TabsTrigger value='personal'>
										Informações Pessoais
									</TabsTrigger>
									<TabsTrigger value='address'>Endereço</TabsTrigger>
									<TabsTrigger value='professional'>
										Informações Profissionais
									</TabsTrigger>
								</TabsList>
								<TabsContent
									value='personal'
									className='space-y-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<FormField
											control={form.control}
											name='fullName'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nome Completo</FormLabel>
													<FormControl>
														<div className='relative'>
															<User className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
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
											name='birthDate'
											render={({ field }) => (
												<FormItem className='flex flex-col'>
													<FormLabel>Data de Nascimento</FormLabel>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={cn(
																		'w-[240px] pl-3 text-left font-normal',
																		!field.value && 'text-muted-foreground',
																	)}>
																	{field.value ? (
																		format(field.value, 'PPP')
																	) : (
																		<span>Selecione uma data</span>
																	)}
																	<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className='w-auto p-0'
															align='start'>
															<Calendar
																mode='single'
																selected={field.value}
																onSelect={field.onChange}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1900-01-01')
																}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
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
											name='zipCode'
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
								</TabsContent>
								<TabsContent
									value='professional'
									className='space-y-4'>
									<FormField
										control={form.control}
										name='userType'
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
									{form.watch('userType') === 'autonomous' && (
										<FormField
											control={form.control}
											name='profession'
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
							</Tabs>
							<Button
								type='submit'
								className='w-full'>
								Salvar Alterações
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
