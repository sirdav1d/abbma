/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { $Enums } from '@prisma/client';

interface CreateTicketProps {
	userId: string;
	type: $Enums.TicketType;
	title: string;
	stripeId?: string;
}

export async function createTicketAction({
	userId,
	type,
	title,
	stripeId,
}: CreateTicketProps) {
	const credentialPassword = Math.random().toString(36).slice(2, 12);
	const user = await prisma.user.findUnique({
		where: { id: userId },
	});


	try {

		if (!user) {
			return { success: false, message: 'Usuário não encontrado' };
		}

		const newTicket = await prisma.ticket.create({
			data: {
				userId: userId,
				type: type,
				title: title,
				credential_email: user?.email,
				credential_pass: credentialPassword,
				stripeId: stripeId ?? '',
				status: 'PENDING',
			},
		});

		await prisma.updates.create({
			data: {
				ticketId: newTicket.id,
				message: `Usuário ${user.name} solicitou o plano ${type}, cadastrar suas credenciais ${credentialPassword} e ${user.email} na plataforma`,
				authorName: user.name

			}
		})

		if (!newTicket) {
			return { success: false, message: 'Plano Não Solicitado' };
		}

		console.log(`Plano ${type} solicitado`);
		//enviar e-mail de confirmação de cadastro
		return { success: true, message: `Plano ${type} solicitado com sucesso` };
	} catch (error) {
		console.log('não solicitado');
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
