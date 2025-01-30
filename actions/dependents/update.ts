/** @format */

'use server';

import { generateContentUpdateDependent } from '@/constants/email-contents';
import { prisma } from '@/lib/prisma';
import { getTitle } from '@/utils/get-title-ticket';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SendEmailAction from '../email/sendEmail';
import GetAllTicketsAction from '../tickets/get-all-tickets';

interface UpdateDependentProps {
	cpf: string;
	date_birth: string;
	degree: string;
	email: string;
	name: string;
	phone: string;
	id: string;
}

export async function updateDependentAction({
	cpf,
	date_birth,
	degree,
	email,
	name,
	phone,

	id,
}: UpdateDependentProps) {
	const session = await getServerSession();
	if (!session) {
		redirect('/login');
	}

	const { data } = await GetAllTicketsAction({ email: session.user.email });

	const ticket = data?.find((item) => item.type !== 'CLUB_VANTAGES');

	if (!ticket) {
		return {
			success: false,
			message: 'Sem Plano associado para cadastrar dependente',
			dependent: null,
		};
	}

	try {
		const dependent = await prisma.dependent.update({
			where: {
				id: id,
			},
			data: {
				name: name,
				degree: degree,
				cpf: cpf,
				date_birth: date_birth,
				email: email,
				phone: phone,
			},
		});
		console.log('depedente atualizado');

		//enviar e-mail de confirmação de cadastro
		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Cliente Atualizou Dados de Dependene',
			htmlContent: generateContentUpdateDependent({ name: name }),
		});

		await prisma.updates.create({
			data: {
				ticketId: ticket.id,
				message: `Usuário ${session.user.name} atualizou o cadastro de um novo dependente: ${dependent.name} - ${dependent.email} - ${dependent.degree} - ${dependent.phone} - ${dependent.date_birth} no plano ${getTitle(ticket.type)}, atualizar cadastro na plataforma em até 48 horas`,
				authorName: session.user.name,
			},
		});

		
		return {
			success: true,
			message: 'Dependente atualizado com sucesso',
			dependent: dependent,
		};
	} catch (error) {
		console.log('não atualizado');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			dependent: null,
		};
	}
}
