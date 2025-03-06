/** @format */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const Alltickets = await prisma.ticket.findMany({
			include: { user: true, Updates: true, Dependent: true },
		});

		const tickets = Alltickets.filter((ticket) => ticket.isActive === true);
		// Verifica se o array de usuários está vazio

		
		if (tickets.length === 0) {
			return NextResponse.json({
				success: false,
				users: [],
				message: 'Nenhum ticket encontrado',
				error: null,
				status: 404,
			});
		}

		// Se encontrar usuários, retorna a resposta com sucesso
		return NextResponse.json({
			success: true,
			tickets,
			message: 'tickets encontrados',
			error: null,
			status: 200,
		});
	} catch (error) {
		// Retorne o erro utilizando NextResponse.json, e defina um status apropriado (por exemplo, 500)
		return NextResponse.json({
			success: false,
			message: 'Erro ao buscar tickets',
			tickets: null,
			error: error instanceof Error ? error.message : error,
			status: 500,
		});
	}
}
