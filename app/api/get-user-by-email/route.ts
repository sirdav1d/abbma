/** @format */

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
	const session = await auth();
	console.log(session);

	if (!session) {
		redirect('/login');
	}
	try {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			include: { Dependent: true, tickets: true },
		});

		// Verifica se o array de usuários está vazio
		if (user) {
			return NextResponse.json({
				success: true,
				user: user,
				message: 'Usuários encontrados',
				error: null,
				status: 200,
			});
		}

		// Se encontrar usuários, retorna a resposta com sucesso

		return NextResponse.json({
			success: false,
			user: null,
			message: 'Nenhum usuário encontrado',
			error: null,
			status: 404,
		});
	} catch (error) {
		// Retorne o erro utilizando NextResponse.json, e defina um status apropriado (por exemplo, 500)
		return NextResponse.json({
			success: false,
			message: 'Erro ao buscar usuários',
			user: null,
			error: error instanceof Error ? error.message : error,
			status: 500,
		});
	}
}
