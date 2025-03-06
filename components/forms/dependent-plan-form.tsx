/** @format */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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

import { updatePlanDependentAction } from '@/actions/dependents/update-plan';
import { useRouter } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const formSchema = z.object({
	plan: z.enum(['TELEMEDICINE_INDIVIDUAL', 'CLUB_VANTAGES']),
});

export default function DependentPlanForm({
	dependentId,
}: {
	dependentId: string;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			plan: 'CLUB_VANTAGES',
		},
	});

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { plan } = values;
		try {
			const response = await updatePlanDependentAction({
				plan: plan,
				id: dependentId,
			});

			if (response.success) {
				toast.success('Dependente Atualizado com sucesso', {
					description: response.message,
				});
				router.refresh();
			} else {
				toast.error('Algo deu errado', { description: response.message });
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
				<div className='grid grid-cols-1 gap-4 mb-5'>
					<FormField
						control={form.control}
						name='plan'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Escolha o Benefício</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue
												placeholder={'Selecione o Plano'}></SelectValue>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='CLUB_VANTAGES'>
											Clube de Vantagens
										</SelectItem>
										<SelectItem value='TELEMEDICINE_INDIVIDUAL'>
											Telemedicina
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					disabled={form.formState.isLoading || form.formState.isSubmitting}
					type='submit'
					className='w-full mt-5'>
					{form.formState.isLoading || form.formState.isSubmitting ? (
						<>
							Atualizar Dependente <Loader2 className='animate-spin' />
						</>
					) : (
						<>
							Atualizar Dependente <ArrowRight />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
