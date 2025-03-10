/** @format */
'use client';

import { Button } from '@/components/ui/button';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import ColumnActions from './columns-actions';
import { User } from '@prisma/client';

export const columns: ColumnDef<User | undefined | unknown>[] = [
	{
		id: 'Cargo',
		accessorKey: 'role',
		header: 'Cargo',
		cell: ({ row }) => (
			<div className='capitalize font-medium text-xs'>
				{row.getValue('Cargo')}
			</div>
		),
	},
	{
		id: 'Nome',
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Nome
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <div className='text-xs'>{row.getValue('Nome')}</div>,
	},
	{
		id: 'Data de Nascimento',
		accessorKey: 'date_birth',
		header: () => {
			return <p className='text-nowrap '>Data de Nascimento</p>;
		},
		cell: ({ row }) => {
			const user = row.original as User;
			return (
				<p className='text-nowrap text-xs'>
					{user.date_birth
						? new Date(user.date_birth).toLocaleDateString('pt-BR')
						: 'N/A'}
				</p>
			);
		},
	},
	{
		id: 'CPF',
		accessorKey: 'cpf',
		header: 'CPF',
		cell: ({ row }) => (
			<div className='capitalize text-xs'>{row.getValue('CPF')}</div>
		),
	},
	{
		id: 'Telefone',
		accessorKey: 'phone',
		header: 'Telefone',
		cell: ({ row }) => (
			<div className='capitalize text-xs'>{row.getValue('Telefone')}</div>
		),
	},
	{
		id: 'Email',
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='lowercase text-xs'>{row.getValue('Email')}</div>
		),
	},

	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const user: Partial<User> | any = row.original;

			return <ColumnActions user={user} />;
		},
	},
];
