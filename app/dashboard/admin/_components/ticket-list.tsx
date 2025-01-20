/** @format */

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ArrowUpDown,
	CheckCircle,
	Clock,
	Heart,
	LayoutGrid,
	LayoutList,
	Phone,
	Shield,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { TicketCards } from './ticket-card';

const benefitTypeIcons = {
	'Clube de Vantagens': Shield,
	Telemedicina: Phone,
	'Plano de Saúde': Heart,
};

type Ticket = {
	id: string;
	number: number;
	name: string;
	type: string;
	status: string;
	createdAt: Date;
};

export function TicketList({ initialTickets }: { initialTickets: Ticket[] }) {
	const [tickets] = useState(initialTickets);
	const [statusFilter, setStatusFilter] = useState('Todos');
	const [benefitFilter, setBenefitFilter] = useState('Todos');
	const [searchQuery, setSearchQuery] = useState('');
	const [dateFilter, setDateFilter] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
	const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

	const filteredTickets = tickets.filter(
		(ticket) =>
			(statusFilter === 'Todos' || ticket.status === statusFilter) &&
			(benefitFilter === 'Todos' || ticket.type === benefitFilter) &&
			(dateFilter === '' ||
				new Date(ticket.createdAt) >= new Date(dateFilter)) &&
			(searchQuery === '' ||
				ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
				ticket.name.toLowerCase().includes(searchQuery.toLowerCase())),
	);

	const sortedTickets = [...filteredTickets].sort((a, b) => {
		if (sortOrder === 'asc') {
			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		} else {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		}
	});

	const toggleSortOrder = () => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
	};

	const toggleViewMode = () => {
		setViewMode(viewMode === 'table' ? 'cards' : 'table');
	};

	return (
		<>
			<div className='flex flex-col md:flex-row gap-4 mb-6'>
				<div className='flex-1'>
					<Input
						placeholder='Pesquisar por número ou nome do cliente'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='w-full'
					/>
				</div>
				<Select
					value={statusFilter}
					onValueChange={setStatusFilter}>
					<SelectTrigger className='w-full md:w-[180px]'>
						<SelectValue placeholder='Filtrar por status' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Todos'>Todos os status</SelectItem>
						<SelectItem value='Pendente'>Pendente</SelectItem>
						<SelectItem value='Em Andamento'>Em Andamento</SelectItem>
						<SelectItem value='Concluído'>Concluído</SelectItem>
					</SelectContent>
				</Select>
				<Select
					value={benefitFilter}
					onValueChange={setBenefitFilter}>
					<SelectTrigger className='w-full md:w-[180px]'>
						<SelectValue placeholder='Filtrar por benefício' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Todos'>Todos os benefícios</SelectItem>
						<SelectItem value='Clube de Vantagens'>
							Clube de Vantagens
						</SelectItem>
						<SelectItem value='Telemedicina'>Telemedicina</SelectItem>
						<SelectItem value='Plano de Saúde'>Plano de Saúde</SelectItem>
					</SelectContent>
				</Select>
				<Input
					type='date'
					value={dateFilter}
					onChange={(e) => setDateFilter(e.target.value)}
					className='w-full md:w-auto'
				/>
				<Button
					onClick={toggleViewMode}
					variant='outline'>
					{viewMode === 'table' ? (
						<LayoutGrid className='h-4 w-4' />
					) : (
						<LayoutList className='h-4 w-4' />
					)}
				</Button>
			</div>

			{viewMode === 'table' ? (
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Número</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead className='w-full md:w-fit'>
									Tipo de Benefício
								</TableHead>
								<TableHead className='w-full md:w-fit'>Status</TableHead>
								<TableHead>
									<Button
										variant='ghost'
										onClick={toggleSortOrder}
										className='w-full md:w-fit flex text-center justify-between items-center'>
										Data de Abertura
										<ArrowUpDown className='h-4 w-4' />
									</Button>
								</TableHead>
								<TableHead>Ações</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sortedTickets.map((ticket) => {
								const BenefitIcon =
									benefitTypeIcons[
										ticket.type as keyof typeof benefitTypeIcons
									];
								return (
									<TableRow key={ticket.id}>
										<TableCell>{`T-000${ticket.number}`}</TableCell>
										<TableCell className=' text-nowrap'>
											{ticket.name}
										</TableCell>
										<TableCell className=' text-nowrap'>
											<div className='flex items-center text-sm '>
												{BenefitIcon && (
													<BenefitIcon className='mr-2 h-3 w-3' />
												)}
												{ticket.type}
											</div>
										</TableCell>
										<TableCell>
											<Badge
												className=' text-nowrap'
												variant={
													ticket.status === 'Pendente'
														? 'warning'
														: ticket.status === 'Em Andamento'
															? 'secondary'
															: 'success'
												}>
												{ticket.status === 'Pendente' && (
													<Clock className='mr-1 h-3 w-3' />
												)}
												{ticket.status === 'Em Andamento' && (
													<Clock className='mr-1 h-3 w-3' />
												)}
												{ticket.status === 'Concluído' && (
													<CheckCircle className='mr-1 h-3 w-3' />
												)}
												{ticket.status}
											</Badge>
										</TableCell>
										<TableCell className='text-center'>
											{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
										</TableCell>
										<TableCell>
											<Button
												variant='link'
												asChild>
												<Link href={`/dashboard/admin/${ticket.id}`}>
													Ver Detalhes
												</Link>
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			) : (
				<TicketCards tickets={sortedTickets} />
			)}
		</>
	);
}
