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
import { Plus } from 'lucide-react';

interface ModalCreateDependentProps {
	userId: string;
	disabled: boolean;
}

export default function ModalCreateDependent({
	userId,
	disabled,
}: ModalCreateDependentProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					disabled={disabled}
					size={'sm'}
					className='disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-fit'>
					Adicionar Dependente <Plus />
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full h-fit flex flex-col justify-center rounded-xl py-5 max-w-sm xl:max-w-xl '>
				<DialogHeader>
					<DialogTitle>Adicionar Novo Dependente</DialogTitle>
					<DialogDescription className='text-balance'>
						Preencha os dados do novo dependente abaixo.
					</DialogDescription>
				</DialogHeader>
				<DependentForm
					userId={userId}
					user={null}
					isUpdating={false}
				/>
			</DialogContent>
		</Dialog>
	);
}
