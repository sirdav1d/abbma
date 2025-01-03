/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import deleteTicketsAction from '../tickets/delete-ticket';
import GetAllTicketsAction from '../tickets/get-all-tickets';

export async function deleteUserAction(email: string) {
	try {
		const tickets = await GetAllTicketsAction();
		tickets?.data?.map((ticket) => {
			deleteTicketsAction({ id: ticket.id });
		});

		const user = await prisma.user.delete({
			where: { email: email },
			include: {
				Dependent: true,
				tickets: true,
			},
		});

		if (user) {
			console.log('usuario encontrado', user);

			//enviar e-mail de confirmação de cadastro
			return {
				ok: true,
				message: 'Usuário deletado com sucesso',
			};
		}

		return { ok: false, message: 'Usuário não encontrado' };
	} catch (error) {
		return {
			ok: false,
			message: 'Algo deu errado, tente novamente',
			error: error,
		};
	}
}
