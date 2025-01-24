/** @format */

'use server';

import { generateContentUpdates } from '@/constants/email-contents';
import { prisma } from '@/lib/prisma';
import SendEmailAction from '../email/sendEmail';

interface createUpdatesActionProps {
	ticketId: string;
	message: string;
	authorName: string;
}

export async function createUpdatesAction({
	ticketId,
	message,
	authorName,
}: createUpdatesActionProps) {
	try {
		const newUpdate = await prisma.updates.create({
			data: {
				ticketId: ticketId,
				message: message,
				authorName: authorName,
				createdAt: new Date(),
			},
		});

		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Nova Tarefa',
			htmlContent: generateContentUpdates({
				name: authorName,
				message: message,
			}),
		});

		return {
			success: true,
			message: 'Atualização cadastrado com sucesso',
			data: newUpdate,
		};
	} catch (error) {
		console.log('Atualização não cadastrada');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			data: null,
		};
	}
}
