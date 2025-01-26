/** @format */

'use client';

import { updateTicketStatusAction } from '@/actions/tickets/update-ticket-status';
import { createUpdatesAction } from '@/actions/updates/create-update';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { $Enums, Updates } from '@prisma/client';

import {
	CheckCircle,
	Clock,
	Heart,
	Phone,
	Shield,
	XCircle,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const benefitTypeIcons = {
	'Clube de Vantagens': Shield,
	Telemedicina: Phone,
	'Plano de Saúde': Heart,
};

type Ticket = {
	id: string;
	number: number;
	name: string;
	type: $Enums.TicketType;
	description: string | null;
	status: $Enums.Status;
	createdAt: Date;
	updates: Updates[];
};

export function TicketDetailContent({ Ticket }: { Ticket: Ticket }) {
	const [newComment, setNewComment] = useState('');
	const router = useRouter();
	const session = useSession();

	if (!session || !session.data) {
		return null;
	}

	const handleSaveChanges = async () => {
		if (newComment === '') {
			toast.error('Comentário não pode ser vazio');
			return;
		}

		const resp = await createUpdatesAction({
			authorName: session.data.user.name,
			message: newComment,
			ticketId: Ticket.id,
		});

		if (!resp.success) {
			console.log(resp);
			toast.error('Erro ao salvar atualização');
		} else {
			toast.success('Atualização salva com sucesso');
			router.refresh();
		}

		setNewComment('');
	};

	async function handleStatusSave(value: string) {
		const resp = await updateTicketStatusAction({
			status: value as $Enums.Status,
			ticketId: Ticket.id,
		});

		if (resp.success) {
			toast.success('Status atualizado com sucesso');
			router.refresh();
		} else {
			toast.error('Erro ao atualizar status');
		}
	}

	const BenefitIcon =
		benefitTypeIcons[Ticket.type as keyof typeof benefitTypeIcons];

	return (
		<>
			<div className='flex justify-between items-start'>
				<div>
					<h1 className='text-2xl font-bold'>{`T-000${Ticket.number}`}</h1>
					<p className='text-gray-500'>Detalhes do chamado</p>
				</div>
				<Badge
					variant={
						Ticket.status === 'PENDING'
							? 'warning'
							: Ticket.status === 'IN_PROGRESS'
								? 'secondary'
								: Ticket.status === 'COMPLETED'
									? 'success'
									: 'destructive'
					}>
					{Ticket.status === 'PENDING' && (
						<>
							<Clock className='mr-1 h-3 w-3' />
							Pendente
						</>
					)}
					{Ticket.status === 'IN_PROGRESS' && (
						<>
							<Clock className='mr-1 h-3 w-3' />
							Em Andamento
						</>
					)}
					{Ticket.status === 'COMPLETED' && (
						<>
							<CheckCircle className='mr-1 h-3 w-3' />
							Concluído
						</>
					)}
					{Ticket.status === 'CANCELED' && (
						<>
							<XCircle className='mr-1 h-3 w-3' />
							Cancelado
						</>
					)}
				</Badge>
			</div>
			<div className='space-y-6 mt-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<h3 className='font-semibold'>Cliente</h3>
						<p>{Ticket.name}</p>
					</div>
					<div>
						<h3 className='font-semibold'>Tipo de Benefício</h3>
						<p className='flex items-center'>
							{BenefitIcon && <BenefitIcon className='mr-2 h-4 w-4' />}
							{Ticket.type == 'CLUB_VANTAGES'
								? 'Clube de Vantagens'
								: Ticket.type == 'HEALTH_PLAN'
									? 'Seguros e Planos de saúde'
									: 'Telemedicina'}
						</p>
					</div>
					<div>
						<h3 className='font-semibold'>Data de Abertura</h3>
						<p>{new Date(Ticket.createdAt).toLocaleDateString('pt-BR')}</p>
					</div>
					<div>
						<h3 className='font-semibold'>Alterar Status</h3>
						<Select
							onValueChange={(value: $Enums.Status) => handleStatusSave(value)}
							value={Ticket.status}>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Selecione o status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='PENDING'>Pendente</SelectItem>
								<SelectItem value='IN_PROGRESS'>Em Andamento</SelectItem>
								<SelectItem value='COMPLETED'>Concluído</SelectItem>
								<SelectItem value='CANCELED'>Cancelado</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div>
					<h3 className='font-semibold'>Descrição</h3>
					<p>{Ticket.description}</p>
				</div>
				<Separator />
				{Ticket.updates.length > 0 && (
					<div>
						<h3 className='font-semibold mb-2'>Histórico de Atualizações</h3>
						<div className='space-y-4'>
							{Ticket.updates.map((update, index) => (
								<div
									key={index}
									className='bg-muted p-3 rounded-md'>
									<p className='text-sm text-muted-foreground'>
										{new Date(update.createdAt).toLocaleDateString('pt-BR')} /{' '}
										{new Date(update.createdAt).toLocaleTimeString('pt-BR', {
											localeMatcher: 'lookup',
										})}{' '}
										- {''}
										{update.authorName}
									</p>
									<p>{update.message}</p>
								</div>
							))}
						</div>
					</div>
				)}

				<div className='space-y-4 mt-6'>
					<div>
						<h3 className='font-semibold mb-2'>Adicionar Comentário</h3>
						<Textarea
							placeholder='Digite um comentário sobre a atualização do chamado'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							className='mb-2'
						/>
					</div>
					<div className='flex gap-5'>
						<Button
							variant={'outline'}
							onClick={() => router.push('/dashboard/admin')}>
							Voltar
						</Button>
						<Button onClick={handleSaveChanges}>Salvar Comentário </Button>
					</div>
				</div>
			</div>
		</>
	);
}
