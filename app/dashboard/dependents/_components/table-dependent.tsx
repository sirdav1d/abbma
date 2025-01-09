/** @format */

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Dependent } from '@prisma/client';
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

interface TableDependentProps {
	dependents?: Dependent[];
}

export default function TableDependent(props: TableDependentProps) {
	return props.dependents && props?.dependents?.length > 0 ? (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead>Parentesco</TableHead>
					<TableHead>Data de Nascimento</TableHead>
					<TableHead>Ações</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.dependents?.map((dependent) => (
					<TableRow key={dependent.id}>
						<TableCell>{dependent.name}</TableCell>
						<TableCell>{dependent.degree}</TableCell>
						<TableCell>{dependent.date_birth}</TableCell>
						<TableCell>
							<div className='flex space-x-2'>
								<Button
									variant='outline'
									size='sm'>
									<Pencil className='h-4 w-4' />
								</Button>
								<Button
									variant='outline'
									size='sm'>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	) : (
		<>
			<p className='text-muted-foreground text-sm'>
				Nenhum Dependente Cadastrado
			</p>
		</>
	);
}
