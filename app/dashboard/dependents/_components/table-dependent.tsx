/** @format */

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Dependent } from '@prisma/client';
import ModalDeleteDependent from './modal-delete-dependent';
import ModalUpdateDependent from './modal-update-dependent';

interface TableDependentProps {
	dependents?: Dependent[];
	userId: string;
}

export default function TableDependent(props: TableDependentProps) {
	return props.dependents && props?.dependents?.length > 0 ? (
		<div className='border rounded-xl'>
			<Table>
				<TableHeader className='bg-blue-600 rounded-lg text-slate-50 hover:bg-blue-700'>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead className='text-center'>Parentesco</TableHead>
						<TableHead className='text-nowrap text-center'>
							Data de Nascimento
						</TableHead>
						<TableHead className='text-center'>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{props.dependents?.map((dependent) => {
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
									<TableCell>
										<div className='flex space-x-2  items-center justify-center'>
											<ModalUpdateDependent
												userId={dependent.id}
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
	) : (
		<>
			<p className='text-muted-foreground text-sm'>
				Nenhum Dependente Cadastrado
			</p>
		</>
	);
}
