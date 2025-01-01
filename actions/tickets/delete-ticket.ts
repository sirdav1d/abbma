/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function deleteTicketsAction({ id }: { id: string }) {
	try {
		const ticket = await prisma.ticket.delete({
			where: { id: id },
		});

		revalidatePath('/', 'layout');
		return { ok: true, message: `Plano ${ticket.title} deletado com sucesso` };
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: `Algo deu errado`,
		};
	}
}
