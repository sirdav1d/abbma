/** @format */

import GetTicketByIdAction from '@/actions/tickets/get-ticket-by-id';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Dependent, Ticket } from '@prisma/client';
import ModalActivePlan from './modal-active-plan';
import ModalDeleteDependent from './modal-delete-dependent';
import ModalUpdateDependent from './modal-update-dependent';

interface TableDependentProps {
	dependents: Dependent[];
	userId: string;
	activePlan: Ticket;
}

export default async function TableDependent(props: TableDependentProps) {
	return (
		<div className='border rounded-xl'>
			<Table>
				<TableHeader className='bg-blue-600 rounded-lg text-slate-50 hover:bg-blue-700'>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead className='text-center'>Parentesco</TableHead>
						<TableHead className='text-nowrap text-center'>
							Data de Nascimento
						</TableHead>
						<TableHead className='text-nowrap text-center'>
							Plano Ativo
						</TableHead>
						<TableHead className='text-nowrap text-center'></TableHead>
						<TableHead className='text-center'>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{props.dependents?.map(async (dependent) => {
						const data = await GetTicketByIdAction(dependent.ticketId ?? '');

						if (dependent.isActive) {
							return (
								<TableRow key={dependent.id}>
									<TableCell className='text-nowrap'>
										{dependent.name}
									</TableCell>
									<TableCell className='text-center'>
										{dependent.degree}
									</TableCell>
									<TableCell className='text-center'>
										{dependent.date_birth}
									</TableCell>
									<TableCell className='text-center text-xs text-nowrap'>
										{data.data?.title ?? 'Nenhum Plano Associado'}
									</TableCell>
									<TableCell className='flex  items-center justify-center'>
										<ModalActivePlan
											activePlan={props.activePlan}
											dependentId={dependent.id}
											quantityDependents={props.dependents?.length}
										/>
									</TableCell>
									<TableCell>
										<div className='flex space-x-2  items-center justify-center'>
											<ModalUpdateDependent
												dependentId={dependent.id}
												dependent={dependent}
											/>
											<ModalDeleteDependent dependent={dependent} />
										</div>
									</TableCell>
								</TableRow>
							);
						}
					})}
				</TableBody>
			</Table>
		</div>
	);
}
