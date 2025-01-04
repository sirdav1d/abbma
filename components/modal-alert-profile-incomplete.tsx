/** @format */

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { ArrowRight, Undo2 } from 'lucide-react';

export default function ModalAlertProfileIncomplete() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='w-full'>
					Assinar <ArrowRight />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Complete Seu Perfil</DialogTitle>
					<DialogDescription>
						Vá até seu perfil e preencha seus dados
					</DialogDescription>
				</DialogHeader>
				<p>
					Ao preencher seus dados na página de perfil, a função de assinar os
					planos de Telemedicina será habilitada
				</p>
				<DialogFooter>
					<DialogClose asChild>
						<Button className='w-full'>
							Voltar <Undo2 />
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
