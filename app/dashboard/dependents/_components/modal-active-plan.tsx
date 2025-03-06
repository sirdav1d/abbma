/** @format */

import BuyButton from '@/components/buy-button';
import DependentPlanForm from '@/components/forms/dependent-plan-form';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Ticket } from '@prisma/client';
import { Zap } from 'lucide-react';

interface ModalCreateDependentProps {
	dependentId: string;
	activePlan: Ticket;
	quantityDependents: number;
}

export default function ModalActivePlan({
	dependentId,
	activePlan,
	quantityDependents,
}: ModalCreateDependentProps) {
	console.log(quantityDependents);
	let dependents = 0;
	if (activePlan.type == 'TELEMEDICINE_FAMILY' && activePlan.quantity) {
		dependents = 3 + (activePlan.quantity > 1 ? activePlan.quantity - 1 : 0);
	} else if (activePlan.type == 'TELEMEDICINE_COUPLE' && activePlan.quantity) {
		dependents = 1 + (activePlan.quantity > 1 ? activePlan.quantity - 1 : 0);
	} else if (activePlan.quantity) {
		dependents = activePlan.quantity - 1;
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'sm'}
					className='disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-fit'>
					Gerenciar Plano <Zap />
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full h-fit flex flex-col justify-center rounded-xl py-5 max-w-sm xl:max-w-xl '>
				<DialogHeader>
					<DialogTitle>Ativar Plano</DialogTitle>
					<DialogDescription className='text-balance'>
						Selecione qual plano deseja ativar para seu dependente
					</DialogDescription>
				</DialogHeader>
				<p>
					Seu plano atual é:{' '}
					<span className='font-bold'>
						{activePlan.title} / {activePlan.quantity} unidade(s)
					</span>{' '}
					isso te permite conceder acesso aos benefícios de Telemedicina e Clube
					de Vantagens para até:{' '}
					<span className='font-bold'>{dependents} dependentes</span>
				</p>

				<DependentPlanForm dependentId={dependentId} />

				<DialogFooter className='w-full'>
					<Accordion
						collapsible
						type='single'
						className='w-full'>
						<AccordionItem value={'item-1'}>
							<AccordionTrigger>Precisa de Mais?</AccordionTrigger>
							<AccordionContent>
								<div className='flex flex-col items-center justify-center text-sm gap-5 text-center'>
									<p className='text-muted-foreground'>
										Caso queira conceder benefícios para mais dependentes, basta
										clicar no link abaixo e atualizar sua assinatura
									</p>
									<BuyButton
										size='sm'
										content='Atualizar Plano'
										priceType={activePlan.type}
										isAddOn
									/>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
