/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export default async function GetAllTicketsAction({
	email,
}: {
	email: string;
}) {
	try {
		const tickets = await prisma.user.findUnique({
			where: { email: email },
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
