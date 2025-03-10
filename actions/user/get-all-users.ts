/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getAllUserAction() {
	try {
		const users = await prisma.user.findMany({});

		if (users) {
			//enviar e-mail de confirmação de cadastro
			return {
				success: true,
				message: 'Usuários encontrados',
				users: users,
			};
		}
		revalidatePath('/dashboard/admin/users', 'layout');
		return { success: false, message: 'Usuários não encontrados', users: null };
	} catch (error) {
		console.log('não encontrado',error);
		return {
			success: false,
			message: `Algo deu errado`,
			users: null,
		};
	}
}
