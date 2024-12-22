/** @format */

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ModalDetailsTicketProps {
	id: string;
	title: string;
	description: string | null;
	type: string;
	status: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export default function ModalDetailsTicket(ticket: ModalDetailsTicketProps) {
	const associado = [
		'Desconto de até 60% em medicamentos em diversas farmácias',
		'Desconto de até 30% em diversos restaurantes em Delivery',
		'Desconto em produtos para  PET ',
		'Descontos em diversas Lojas',
		'Descontos em diversos seguros',
		'Descontos em telemedicina',
		'Descontos em Planos de Saúde',
		'Desconto de até 60% em cinema, teatro e shows',
		'Acesso a diversos cursos',
	];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='w-full'>Ver Detalhes</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='w-full flex items-center justify-between'>
						{ticket.type}{' '}
						<span className='rounded-full bg-green-200 text-green-800 text-xs py-1 px-2 mr-5'>
							{ticket.status}
						</span>
					</DialogTitle>
					<DialogDescription>{ticket.description}</DialogDescription>
				</DialogHeader>
				<p>
					<strong>Tarefa:</strong> {ticket.title}
				</p>
				<div className='flex flex-col gap-2 text-sm items-start'>
					<p>
						<strong>Data de criação:</strong>{' '}
						{ticket.createdAt?.toLocaleString()}
					</p>
					<p>
						<strong>Última Atualização:</strong>{' '}
						{ticket.createdAt?.toLocaleString()}
					</p>
				</div>
				<Separator />
				<h3 className='font-bold'>Vantagens:</h3>
				<ul>
					{associado.map((item, index) => {
						return (
							<li
								key={index}
								className='text-sm'>
								{item}
							</li>
						);
					})}
				</ul>
				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
