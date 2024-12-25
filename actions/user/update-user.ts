/** @format */

'use server';

import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function updateUserAction({ user }: { user: Partial<User> }) {
	try {
		if (user.password) {
			const hashedPassword = await bcrypt.hash(user.password, 10);

			const resp = await prisma.user.update({
				where: { email: user.email },
				data: {
					name: user.name,
					phone: user.phone,
					date_birth: user.date_birth,
					address: user.address,
					city: user.city,
					cep: user.cep,
					state: user.state,
					password: hashedPassword,
					occupation: user.occupation,
					is_militar: user.is_militar,
					neighborhood: user.neighborhood,
					updatedAt: new Date(),
				},
			});
			console.log(resp);
			revalidatePath('/dashboard/profile');
		} else {
			const resp2 = await prisma.user.update({
				where: { email: user.email },
				data: {
					name: user.name,
					phone: user.phone,
					date_birth: user.date_birth,
					address: user.address,
					city: user.city,
					cep: user.cep,
					state: user.state,
					occupation: user.occupation,
					is_militar: user.is_militar,
					neighborhood: user.neighborhood,
					updatedAt: new Date(),
				},
			});
			console.log(resp2);
			revalidatePath('/dashboard/profile');
		}

		console.log('atualizado');
		//enviar e-mail de confirmação de cadastro
		return { success: true, message: 'Usuário atualizado com sucesso' };
	} catch (error) {
		console.log(error);
		console.log('não cadastrado');
		return { success: false, message: 'Algo deu errado, tente novamente' };
	}
}
