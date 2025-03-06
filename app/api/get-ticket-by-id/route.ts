/** @format */

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		const ticket = await prisma.ticket.findUnique({
			where: { id: body },
			include: { user: true, Updates: true, Dependent: true },
		});

		// Verifica se o array de usuários está vazio
		if (!ticket) {
			return NextResponse.json({
				success: false,
				ticket: null,
				message: 'Nenhum ticket encontrado',
				error: null,
				status: 404,
			});
		}

		// Se encontrar usuários, retorna a resposta com sucesso
		return NextResponse.json({
			success: true,
			ticket,
			message: 'tickets encontrados',
			error: null,
			status: 200,
		});
	} catch (error) {
		// Retorne o erro utilizando NextResponse.json, e defina um status apropriado (por exemplo, 500)
		return NextResponse.json({
			success: false,
			message: 'Erro ao buscar tickets',
			ticket: null,
			error: error instanceof Error ? error.message : error,
			status: 500,
		});
	}
}
