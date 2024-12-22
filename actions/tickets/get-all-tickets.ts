/** @format */

'use server';

import { prisma } from '@/lib/prisma';

export default async function GetAllTicketsAction() {
	try {
		const tickets = await prisma.ticket.findMany();
		return tickets;
	} catch (error) {
		console.log(error);
	}
}
