/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function GetAllTicketsAction() {
	const session = await getServerSession();
	try {
		const tickets = await prisma.user.findUnique({
			where: { email: session?.user.email },
			include: {
				tickets: true,
			},
		});
		return { success: true, message: `Deu certo`, data: tickets?.tickets };
	} catch (error) {
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			data: null,
		};
	}
}
