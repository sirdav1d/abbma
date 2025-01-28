/** @format */
'use server';

import GetAllDependentsAction from '@/actions/dependents/get-all';
import GetAllTicketsAction from '@/actions/tickets/get-all-tickets';
import { $Enums } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface HowMuchIsAbleProps {
	number: number;
	type: $Enums.TicketType;
}

export async function howMuchIsAble(): Promise<HowMuchIsAbleProps | undefined> {
	const session = await getServerSession();
	if (!session) {
		redirect('/login');
	}
	const { data: Tickets } = await GetAllTicketsAction({
		email: session.user.email,
	});
	const { data } = await GetAllDependentsAction();

	const activeDeps = data?.filter((item) => item.isActive === true);

	// descobrir quantos tickets abertos eu tenho do tipo casal e do tipo familia (reperesenta a quantidade de dependentes que posso add)

	const isCouple = Tickets?.filter(
		(item) => item.type == 'TELEMEDICINE_COUPLE' && item.isActive,
	);

	const isFamily = Tickets?.filter(
		(item) => item.type == 'TELEMEDICINE_FAMILY',
	);

	// descobrir a quantidade de dependentes adicionados

	const dependentsNumber = activeDeps?.length ? activeDeps?.length : 0;

	// retornar a quantidade de dependentes que posso adicionar

	if (isCouple && isCouple.length > 0) {
		const resp = isCouple?.length - dependentsNumber;
		return { number: resp, type: 'TELEMEDICINE_COUPLE' };
	}

	if (isFamily && isFamily.length > 0 && dependentsNumber) {
		const resp = isFamily.length + 3 - dependentsNumber;
		return { number: resp, type: 'TELEMEDICINE_FAMILY' };
	}
}
