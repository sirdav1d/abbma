/** @format */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const users = await prisma.user.findMany();

		// Verifica se o array de usuários está vazio
		if (users.length === 0) {
			return NextResponse.json({
				success: false,
				users: [],
				message: 'Nenhum usuário encontrado',
				error: null,
				status:404
			});
		}

		// Se encontrar usuários, retorna a resposta com sucesso
		return NextResponse.json({
			success: true,
			users,
			message: 'Usuários encontrados',
			error: null,
			status: 200,
		});
	} catch (error) {
		// Retorne o erro utilizando NextResponse.json, e defina um status apropriado (por exemplo, 500)
		return NextResponse.json({
			success: false,
			message: 'Erro ao buscar usuários',
			users: null,
			error: error instanceof Error ? error.message : error,
			status: 500,
		});
	}
}
