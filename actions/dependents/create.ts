/** @format */

'use server';

import {
	generateContentNewDependent,
	generateContentNewDependentToDependent,
} from '@/constants/email-contents';
import { prisma } from '@/lib/prisma';
import { getTitle } from '@/utils/get-title-ticket';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SendEmailAction from '../email/sendEmail';
import GetAllTicketsAction from '../tickets/get-all-tickets';
import { revalidateTag } from 'next/cache';

interface CreateDependentProps {
	cpf: string;
	date_birth: string;
	degree: string;
	email: string;
	name: string;
	phone: string;
	userId: string;
}

export async function createDependentAction({
	cpf,
	date_birth,
	degree,
	email,
	name,
	phone,
	userId,
}: CreateDependentProps) {
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
		const dependent = await prisma.dependent.create({
			data: {
				name: name,
				degree: degree,
				cpf: cpf,
				date_birth: date_birth,
				email: email,
				phone: phone,
				userId: userId,
				isActive: true,
			},
		});
		console.log('depedente cadastrado');
		//enviar e-mail de confirmação de cadastro
		const href = `www.abbma.org.br/licenseShare/${dependent.id}`;

		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Cliente Cadastrou Novo Dependente',
			htmlContent: generateContentNewDependent({ name: dependent?.name ?? '' }),
		});

		await SendEmailAction({
			email: email,
			subject: 'Bem vindo a ABBMA',
			htmlContent: generateContentNewDependentToDependent({
				dependentName: dependent.name,
				userName: session.user.name,
				href: href,
			}),
		});

		revalidateTag('user')

		console.log(href);

		await prisma.updates.create({
			data: {
				ticketId: ticket.id,
				message: `Usuário ${session.user.name} solicitou o cadastro de um novo dependente: ${dependent.name} - ${dependent.email} - ${dependent.degree} - ${dependent.phone} - ${dependent.date_birth} no plano ${getTitle(ticket.type)}, atualizar cadastro na plataforma em até 48 horas`,
				authorName: session.user.name,
			},
		});

		return {
			success: true,
			message: 'Dependente cadastrado com sucesso',
			dependent: dependent,
		};
	} catch (error) {
		console.log('não cadastrado');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			dependent: null,
		};
	}
}
