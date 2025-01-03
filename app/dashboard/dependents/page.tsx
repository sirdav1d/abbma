/** @format */

'use client';

import DependentForm from '@/components/forms/dependent-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialDependents = [
	{
		id: 1,
		name: 'Maria Silva',
		relationship: 'Cônjuge',
		birthDate: '15/05/1985',
	},
	{ id: 2, name: 'João Silva', relationship: 'Filho', birthDate: '22/08/2010' },
	{ id: 3, name: 'Ana Silva', relationship: 'Filha', birthDate: '10/03/2012' },
];

export default function DependentsPage() {
	const [dependents, setDependents] = useState(initialDependents);
	const [isAddingDependent, setIsAddingDependent] = useState(false);

	const handleDeleteDependent = (id: number) => {
		setDependents(dependents.filter((dep) => dep.id !== id));
	};

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Gerencie Seus Dependentes
			</h2>
			<Card className='mt-5'>
				<CardHeader>
					<div className='flex justify-between md:items-center md:flex-row flex-col gap-5'>
						<CardTitle>Dependentes</CardTitle>
						<Dialog
							open={isAddingDependent}
							onOpenChange={setIsAddingDependent}>
							<DialogTrigger asChild>
								<Button size={'sm'}>
									Adicionar Dependente <Plus />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Adicionar Novo Dependente</DialogTitle>
									<DialogDescription>
										Preencha os dados do novo dependente abaixo.
									</DialogDescription>
								</DialogHeader>
								<DependentForm />
							</DialogContent>
						</Dialog>
					</div>
				</CardHeader>
				<CardContent>
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
							{dependents.map((dependent) => (
								<TableRow key={dependent.id}>
									<TableCell>{dependent.name}</TableCell>
									<TableCell>{dependent.relationship}</TableCell>
									<TableCell>{dependent.birthDate}</TableCell>
									<TableCell>
										<div className='flex space-x-2'>
											<Button
												variant='outline'
												size='sm'>
												<Pencil className='h-4 w-4' />
											</Button>
											<Button
												variant='outline'
												size='sm'
												onClick={() => handleDeleteDependent(dependent.id)}>
												<Trash2 className='h-4 w-4' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
