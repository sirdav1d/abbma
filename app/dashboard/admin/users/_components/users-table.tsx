/** @format */

'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Search } from 'lucide-react';
import * as React from 'react';
import { columns } from './columns';
import { User } from '@prisma/client';
import ModalCreateUser from './modal-create-user';
import DataTablePagination from '@/components/ui/data-table-pagination';
// import { ModalCreateUser } from './ModalCreateUser';

export function DataTableDemo({ data }: { data: User[] }) {
	// const data = await getAllUsersAction();

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,

		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	return (
		<div className='w-full mx-auto md:pr-10 px-3 pb-5'>
			<div className='flex items-center py-4 flex-col md:flex-row gap-5 mx-auto w-full'>
				<div className='flex items-center gap-2 w-full md:max-w-md justify-start rounded pl-2 '>
					<Search
						className=''
						size={24}
					/>

					<Input
						placeholder='Procure pelo nome'
						value={(table.getColumn('Nome')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('Nome')?.setFilterValue(event.target.value)
						}
						className='md:max-w-sm h-fit text-slate-950 bg-transparent'></Input>
				</div>
				<div className='flex items-center justify-between md:justify-start  md:ml-auto md:flex-row mx-auto w-full gap-3'>
					<ModalCreateUser />

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								className='ml-auto'>
								Colunas <ChevronDown className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className='rounded-xl border w-full'>
				<Table className='bg-white  w-full mr-auto text-slate-900'>
					<TableHeader className='bg-blue-600 rounded-lg text-slate-50 hover:bg-blue-700'>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className='text-nowrap'>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									sem resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}
