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
			<div className='capitalize font-medium'>{row.getValue('Cargo')}</div>
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
		cell: ({ row }) => <div>{row.getValue('Nome')}</div>,
	},
	{
		id: 'CPF',
		accessorKey: 'cpf',
		header: 'CPF',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('CPF')}</div>,
	},
	{
		id: 'Telefone',
		accessorKey: 'phone',
		header: 'Telefone',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('Telefone')}</div>
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
		cell: ({ row }) => <div className='lowercase'>{row.getValue('Email')}</div>,
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
