/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import SendEmailAction from '../email/sendEmail';
import { generateContentNewDependent } from '@/constants/email-contents';

interface CreateDependentProps {
	cpf: string;
	date_birth: string;
	degree: string;
	email: string;
	name: string;
	phone: string;

	userId: string;
}

export async function createDependentAction({
	cpf,
	date_birth,
	degree,
	email,
	name,
	phone,

	userId,
}: CreateDependentProps) {
	try {
		const user = await prisma.dependent.create({
			data: {
				name: name,
				degree: degree,

				cpf: cpf,
				date_birth: date_birth,
				email: email,

				phone: phone,

				userId: userId,
				isActive: true,
			},
		});
		console.log('depedente cadastrado');
		//enviar e-mail de confirmação de cadastro

		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Usuário Cadastrou Novo Dependente',
			htmlContent: generateContentNewDependent({ name: user?.name ?? '' }),
		});
		return {
			success: true,
			message: 'Dependente cadastrado com sucesso',
			dependent: user,
		};
	} catch (error) {
		console.log('não cadastrado');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			dependent: null,
		};
	}
}
