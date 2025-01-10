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
				{props.dependents?.map((dependent) => {
					if (dependent.isActive) {
						return (
							<TableRow key={dependent.id}>
								<TableCell>{dependent.name}</TableCell>
								<TableCell>{dependent.degree}</TableCell>
								<TableCell>{dependent.date_birth}</TableCell>
								<TableCell>
									<div className='flex space-x-2'>
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
	) : (
		<>
			<p className='text-muted-foreground text-sm'>
				Nenhum Dependente Cadastrado
			</p>
		</>
	);
}
