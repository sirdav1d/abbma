/** @format */

'use client';

import FormManage from '@/components/forms/form-manage-user';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { User } from '@prisma/client';
import { Pencil } from 'lucide-react';

export default function ModalManageUser({ user }: { user: Partial<User> }) {
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
					<DialogTitle>Editar Usuário</DialogTitle>
					<DialogDescription className='text-balance'>
						Gerencie seus usuários e altere permissões
					</DialogDescription>
				</DialogHeader>
				<FormManage user={user} />
			</DialogContent>
		</Dialog>
	);
}
