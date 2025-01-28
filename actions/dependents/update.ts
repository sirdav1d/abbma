/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import SendEmailAction from '../email/sendEmail';
import { generateContentUpdateDependent } from '@/constants/email-contents';

interface UpdateDependentProps {
	cpf: string;
	date_birth: string;
	degree: string;
	email: string;
	name: string;
	phone: string;
	id: string;
}

export async function updateDependentAction({
	cpf,
	date_birth,
	degree,
	email,
	name,
	phone,

	id,
}: UpdateDependentProps) {
	try {
		const user = await prisma.dependent.update({
			where: {
				id: id,
			},
			data: {
				name: name,
				degree: degree,
				cpf: cpf,
				date_birth: date_birth,
				email: email,
				phone: phone,
			},
		});
		console.log('depedente atualizado');

		
		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Cliente Atualizou Dados de Dependene',
			htmlContent: generateContentUpdateDependent({ name: name }),
		});

		revalidatePath('/dashboard/dependents');
		//enviar e-mail de confirmação de cadastro
		return {
			success: true,
			message: 'Dependente atualizado com sucesso',
			dependent: user,
		};
	} catch (error) {
		console.log('não atualizado');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			dependent: null,
		};
	}
}
