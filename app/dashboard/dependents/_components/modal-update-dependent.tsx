/** @format */

import DependentForm from '@/components/forms/dependent-form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Dependent } from '@prisma/client';
import { Pencil } from 'lucide-react';

interface ModalUpdateDependentProps {
	dependentId: string;
	dependent: Partial<Dependent>;
}

export default function ModalUpdateDependent({
	dependent,
	dependentId,
}: ModalUpdateDependentProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'sm'}
					className='disabled:opacity-50 disabled:cursor-not-allowed'>
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full flex flex-col justify-center rounded-xl py-5 max-w-sm xl:max-w-xl '>
				<DialogHeader>
					<DialogTitle>Atualizar Novo Dependente</DialogTitle>
					<DialogDescription className='text-balance'>
						Preencha os dados do novo dependente abaixo.
					</DialogDescription>
				</DialogHeader>
				<DependentForm
					userId={dependentId}
					user={dependent ?? null}
					isUpdating={true}
				/>
			</DialogContent>
		</Dialog>
	);
}
