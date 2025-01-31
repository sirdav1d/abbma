/** @format */

import RegisterAgentForm from '@/components/forms/register-form-agent';
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

export default function ModalManageUser() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'sm'}
					className='disabled:opacity-50 disabled:cursor-not-allowed'>
					<Plus />
					Adicionar Usuário
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full flex flex-col justify-center rounded-xl py-5 max-w-sm xl:max-w-xl '>
				<DialogHeader>
					<DialogTitle>Adicionar Novo Usuário</DialogTitle>
					<DialogDescription className='text-balance'>
						Preencha os dados e cargo do novo usuário abaixo.
					</DialogDescription>
				</DialogHeader>
				<RegisterAgentForm />
			</DialogContent>
		</Dialog>
	);
}
