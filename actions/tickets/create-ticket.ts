/** @format */

'use server';

import { generateContentNewTicket } from '@/constants/email-contents';
import { prisma } from '@/lib/prisma';
import { getTitle } from '@/utils/get-title-ticket';
import { $Enums } from '@prisma/client';
import SendEmailAction from '../email/sendEmail';
import { revalidateTag } from 'next/cache';

interface CreateTicketProps {
	userId: string;
	type: $Enums.TicketType;
	title: string;
	stripeId?: string;
	messageUpdates?: string;
	isDependent?: boolean;
}

export async function createTicketAction({
	userId,
	type,
	title,
	stripeId,
	messageUpdates,
	isDependent,
}: CreateTicketProps) {
	try {
		let newTicket;

		if (isDependent) {
			const dependent = await prisma.dependent.findUnique({
				where: { id: userId },
			});

			if (!dependent) {
				return { success: false, message: 'Dependente não encontrado' };
			}
			newTicket = await prisma.ticket.create({
				data: {
					dependentId: userId,
					type: type,
					title: title,
					isActive: true,
					stripeId: stripeId ?? '',
					status: 'PENDING',
					quantity: 1,
				},
			});

			if (!newTicket) {
				return {
					success: false,
					message: 'Plano Não Solicitado',
					data: null,
				};
			}

			await SendEmailAction({
				email: 'contato@abbma.org.br',
				subject: 'Novo Plano Ativado',
				htmlContent: generateContentNewTicket({
					name: dependent.name,
					message: `Dependente ${dependent.name} ativou o plano ${getTitle(type)}, fazer cadastro na plataforma em até 48 horas`,
				}),
			});

			await prisma.updates.create({
				data: {
					ticketId: newTicket.id,
					message:
						messageUpdates ??
						`Dependente ${dependent.name} ativou o plano ${getTitle(type)}, fazer cadastro na plataforma em até 48 horas`,
					authorName: dependent.name,
				},
			});

			revalidateTag('user-by-email');
			console.log(`Plano ${getTitle(type)} solicitado`);
			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: `Plano ${getTitle(type)} solicitado com sucesso`,
				data: newTicket,
			};
		} else {
			const user = await prisma.user.findUnique({
				where: { id: userId },
			});

			if (!user) {
				return { success: false, message: 'Usuário não encontrado' };
			}
			newTicket = await prisma.ticket.create({
				data: {
					userId: userId,
					type: type,
					title: title,
					isActive: true,
					stripeId: stripeId ?? '',
					status: 'PENDING',
					quantity: 1,
				},
			});

			if (!newTicket) {
				return {
					success: false,
					message: 'Plano Não Solicitado',
					data: null,
				};
			}

			await SendEmailAction({
				email: 'contato@abbma.org.br',
				subject: 'Novo Plano Contratado',
				htmlContent: generateContentNewTicket({
					name: user.name,
					message: `Cliente ${user.name} solicitou o plano ${getTitle(type)}, fazer cadastro na plataforma em até 48 horas`,
				}),
			});

			await prisma.updates.create({
				data: {
					ticketId: newTicket.id,
					message:
						messageUpdates ??
						`Cliente ${user.name} solicitou o plano ${getTitle(type)}, fazer cadastro na plataforma em até 48 horas`,
					authorName: user.name,
				},
			});

			revalidateTag('user-by-email');
			console.log(`Plano ${getTitle(type)} solicitado`);
			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: `Plano ${getTitle(type)} solicitado com sucesso`,
				data: newTicket,
			};
		}
	} catch (error) {
		console.log('não solicitado', error);
		return { success: false, message: `Algo deu errado`, data: null };
	}
}
