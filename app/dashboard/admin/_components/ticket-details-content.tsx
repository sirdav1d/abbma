/** @format */

'use client';

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
import {
	CheckCircle,
	Clock,
	Heart,
	Phone,
	Shield,
	XCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const benefitTypeIcons = {
	'Clube de Vantagens': Shield,
	Telemedicina: Phone,
	'Plano de Saúde': Heart,
};

type Ticket = {
	id: number;
	number: string;
	clientName: string;
	benefitType: string;
	description: string;
	status: string;
	openDate: string;
	updates: Array<{ date: string; message: string; author: string }>;
};

export function TicketDetailContent({
	initialTicket,
}: {
	initialTicket: Ticket;
}) {
	const [ticket, setTicket] = useState(initialTicket);
	const [newComment, setNewComment] = useState('');
	const router = useRouter();

	const handleSaveChanges = () => {
		const updatedTicket = {
			...ticket,
			status: ticket.status,
			updates: [
				...ticket.updates,
				{
					date: new Date().toLocaleString('pt-BR'),
					message: `Status atualizado para ${ticket.status}${newComment ? `. Comentário: ${newComment}` : ''}`,
					author: 'Operador: Sistema',
				},
			],
		};
		setTicket(updatedTicket);
		setNewComment('');
	};

	const BenefitIcon =
		benefitTypeIcons[ticket.benefitType as keyof typeof benefitTypeIcons];

	return (
		<>
			<div className='flex justify-between items-start'>
				<div>
					<h1 className='text-2xl font-bold'>Chamado {ticket.number}</h1>
					<p className='text-gray-500'>Detalhes do chamado</p>
				</div>
				<Badge
					variant={
						ticket.status === 'Pendente'
							? 'warning'
							: ticket.status === 'Em Andamento'
								? 'secondary'
								: ticket.status === 'Concluído'
									? 'success'
									: 'destructive'
					}>
					{ticket.status === 'Pendente' && <Clock className='mr-1 h-3 w-3' />}
					{ticket.status === 'Em Andamento' && (
						<Clock className='mr-1 h-3 w-3' />
					)}
					{ticket.status === 'Concluído' && (
						<CheckCircle className='mr-1 h-3 w-3' />
					)}
					{ticket.status === 'Cancelado' && (
						<XCircle className='mr-1 h-3 w-3' />
					)}
					{ticket.status}
				</Badge>
			</div>
			<div className='space-y-6 mt-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<h3 className='font-semibold'>Cliente</h3>
						<p>{ticket.clientName}</p>
					</div>
					<div>
						<h3 className='font-semibold'>Tipo de Benefício</h3>
						<p className='flex items-center'>
							{BenefitIcon && <BenefitIcon className='mr-2 h-4 w-4' />}
							{ticket.benefitType}
						</p>
					</div>
					<div>
						<h3 className='font-semibold'>Data de Abertura</h3>
						<p>{new Date(ticket.openDate).toLocaleDateString('pt-BR')}</p>
					</div>
					<div>
						<h3 className='font-semibold'>Alterar Status</h3>
						<Select
							onValueChange={(value) => setTicket({ ...ticket, status: value })}
							value={ticket.status}>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Selecione o status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='Pendente'>Pendente</SelectItem>
								<SelectItem value='Em Andamento'>Em Andamento</SelectItem>
								<SelectItem value='Concluído'>Concluído</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div>
					<h3 className='font-semibold'>Descrição</h3>
					<p>{ticket.description}</p>
				</div>
				<Separator />
				<div>
					<h3 className='font-semibold mb-2'>Histórico de Atualizações</h3>
					<div className='space-y-4'>
						{ticket.updates.map((update, index) => (
							<div
								key={index}
								className='bg-muted p-3 rounded-md'>
								<p className='text-sm text-muted-foreground'>
									{update.date} - {update.author}
								</p>
								<p>{update.message}</p>
							</div>
						))}
					</div>
				</div>
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
						<Button onClick={handleSaveChanges}>Salvar Alterações </Button>
					</div>
				</div>
			</div>
		</>
	);
}
