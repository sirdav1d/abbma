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
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

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
						<Button
							asChild
							className='w-full'>
							<Link href={'/dashboard/profile'}>
								Completar Perfil Agora <ArrowRight />
							</Link>
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
