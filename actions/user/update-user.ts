/** @format */

'use server';

import { generateContentUpdateUser } from '@/constants/email-contents';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import SendEmailAction from '../email/sendEmail';
import bcrypt from 'bcrypt';
export async function updateUserAction({ user }: { user: Partial<User> }) {
	let hashPass;
	if (user.password) hashPass = await bcrypt.hash(user.password!, 10);

	try {
		await prisma.user.update({
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
				customer_id: user.customer_id,
				isSubscribed: user.isSubscribed,
				isActive: user.isActive,
				password: hashPass,
				role: user.role,
			},
		});

		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Usuário Atualizado',
			htmlContent: generateContentUpdateUser({ name: user?.name ?? '' }),
		});

		console.log('atualizado');
		revalidateTag('users');
		//enviar e-mail de confirmação de cadastro
		return { success: true, message: 'Usuário atualizado com sucesso' };
	} catch (error) {
		console.log(JSON.stringify(error));
		return { success: false, message: `Algo deu errado` };
	}
}
