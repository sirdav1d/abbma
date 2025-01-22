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
	isAble: boolean;
	userId: string;
}

export default function ModalCreateDependent({
	isAble,
	userId,
}: ModalCreateDependentProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'sm'}
					disabled={!isAble}
					className='disabled:opacity-50 disabled:cursor-not-allowed'>
					Adicionar Dependente <Plus />
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full h-full md:h-fit py-5 max-w-sm xl:max-w-4xl '>
				<DialogHeader>
					<DialogTitle>Adicionar Novo Dependente</DialogTitle>
					<DialogDescription>
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
