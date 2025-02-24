/** @format */

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { ColumnDef } from '@tanstack/react-table';
import {
	ArrowUpDown,
	CheckCircle,
	Clock,
	LayoutGrid,
	LayoutList,
	Phone,
	Search,
	Gift,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { TicketCards } from './ticket-card';

const benefitTypeIcons = {
	'Clube de Vantagens': Gift,
	Telemedicina: Phone,
};

type Ticket = {
	id: string;
	number: number;
	name: string;
	userId: string;
	type: string;
	status: string;
	createdAt: Date;
	dependents: string[];
};

export function TicketList({ initialTickets }: { initialTickets: Ticket[] }) {
	const [tickets] = useState(initialTickets);
	const [statusFilter, setStatusFilter] = useState('Todos');
	const [benefitFilter, setBenefitFilter] = useState('Todos');
	const [searchQuery, setSearchQuery] = useState('');
	const [dateFilter, setDateFilter] = useState('');

	const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

	const filteredTickets = useMemo(() => {
		return tickets.filter(
			(ticket) =>
				(statusFilter === 'Todos' || ticket.status === statusFilter) &&
				(benefitFilter === 'Todos' || ticket.type === benefitFilter) &&
				(dateFilter === '' ||
					new Date(ticket.createdAt) >= new Date(dateFilter)) &&
				(searchQuery === '' ||
					ticket.number.toString().includes(searchQuery.toLowerCase()) ||
					ticket.name.toLowerCase().includes(searchQuery.toLowerCase())),
		);
	}, [tickets, statusFilter, benefitFilter, dateFilter, searchQuery]);

	const toggleViewMode = () => {
		setViewMode(viewMode === 'table' ? 'cards' : 'table');
	};

	const columns: ColumnDef<Ticket>[] = [
		{
			accessorKey: 'number',
			header: 'Número',
			cell: ({ row }) => {
				const number = row.getValue('number') as string;
				return `T-000${number}`;
			},
		},
		{
			id: 'Nome',
			accessorKey: 'name',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						Nome
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.getValue('Nome')}</div>,
		},
		{
			accessorKey: 'type',
			header: 'Tipo de Benefício',
			cell: ({ row }) => {
				const benefitType = row.getValue('type') as string;
				const BenefitIcon =
					benefitTypeIcons[benefitType as keyof typeof benefitTypeIcons];
				return (
					<div className='flex items-center'>
						{BenefitIcon && <BenefitIcon className='mr-2 h-4 w-4' />}
						{benefitType}
					</div>
				);
			},
		},
		// {
		// 	accessorKey: 'dependents',
		// 	header: 'Dependente',
		// 	cell: ({ row }) => (
		// 		<div className='text-left'>{row.getValue('dependents')}</div>
		// 	),
		// },
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const status = row.getValue('status') as string;
				return (
					<Badge
						variant={
							status === 'Pendente'
								? 'warning'
								: status === 'Em Andamento'
									? 'secondary'
									: 'success'
						}>
						{status === 'Pendente' && <Clock className='mr-1 h-3 w-3' />}
						{status === 'Em Andamento' && <Clock className='mr-1 h-3 w-3' />}
						{status === 'Concluído' && <CheckCircle className='mr-1 h-3 w-3' />}
						{status}
					</Badge>
				);
			},
		},
		{
			accessorKey: 'createdAt',
			header: ({ column }) => {
				return (
					<Button
						variant='ghost'
						className='w-full justify-center'
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}>
						Data de Abertura
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({ row }) => {
				return new Date(row.getValue('createdAt')).toLocaleDateString('pt-BR');
			},
			sortingFn: 'datetime',
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const ticket = row.original;
				return (
					<Button
						variant='link'
						asChild>
						<Link href={`/dashboard/admin/${ticket.id}`}>Ver Detalhes</Link>
					</Button>
				);
			},
		},
	];

	return (
		<>
			<div className='flex flex-col md:flex-row gap-4 mb-6'>
				<div className='flex-1 gap-2 flex items-center'>
					<Search size={24} />
					<Input
						placeholder='Pesquisar pelo número ou nome do cliente'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='w-full'
					/>
				</div>
				<Select
					value={statusFilter}
					onValueChange={setStatusFilter}>
					<SelectTrigger className='w-full md:w-[220px]'>
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
					<SelectTrigger className='w-full md:w-[220px] text-left'>
						<SelectValue placeholder='Filtrar por benefício' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Todos'>Todos os benefícios</SelectItem>
						<SelectItem value='Clube de Vantagens'>
							Clube de Vantagens
						</SelectItem>
						<SelectItem value='Telemedicina'>Telemedicina</SelectItem>
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
				<>
					<DataTable
						columns={columns}
						data={filteredTickets}
					/>
				</>
			) : (
				<TicketCards tickets={filteredTickets} />
			)}
		</>
	);
}
