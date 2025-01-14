/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function manageUserAction({ user }: { user: Partial<User> }) {
	try {
		const resp = await prisma.user.update({
			where: { email: user.email },
			data: {
				name: user.name,
				email: user.email,
				role: user.role,
				updatedAt: new Date(),
			},
		});
		console.log(resp);
		revalidatePath('/dashboard/profile');

		console.log('atualizado');
		//enviar e-mail de confirmação de cadastro
		return { success: true, message: 'Usuário atualizado com sucesso' };
	} catch (error) {
		console.log('não cadastrado');
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
