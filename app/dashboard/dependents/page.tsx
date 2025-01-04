/** @format */

import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
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
import { ArrowRight, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default async function DependentsPage() {
	const tickets = await GetAllTicketsAction();
	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				Gerencie Seus Dependentes
			</h2>
			<Card className='mt-5'>
				<CardHeader>
					<div className='flex justify-between md:items-center md:flex-row flex-col gap-5'>
						<CardTitle>Dependentes</CardTitle>
						<Dialog>
							<DialogTrigger asChild>
								<Button
									size={'sm'}
									disabled={tickets?.data?.length === 0}
									className='disabled:opacity-50 disabled:cursor-not-allowed'>
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
					{tickets.data?.length === 0 ? (
						<>
							{' '}
							<div className='flex flex-col items-center justify-center gap-5 w-full'>
								<h3 className='text-muted-foreground'>
									Você não possui planos que permitam ter dependentes
								</h3>
								<Button
									asChild
									variant={'link'}>
									<Link href={'/dashboard'}>
										Ver Planos Disponíveis <ArrowRight />
									</Link>
								</Button>
							</div>
						</>
					) : (
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
								{tickets?.data?.map((dependent) => (
									<TableRow key={dependent.id}>
										{/* <TableCell>{dependent.name}</TableCell>
									<TableCell>{dependent.relationship}</TableCell>
									<TableCell>{dependent.birthDate}</TableCell> */}
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
					)}
				</CardContent>
			</Card>
		</div>
	);
}
