/** @format */

'use server';

import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';
import SendEmailAction from '../email/sendEmail';
import { generateContenNewUser } from '@/constants/email-contents';
import { revalidateTag } from 'next/cache';

interface CreateAgentProps {
	email: string;
	name: string;
	cpf: string;
	role: 'AGENT' | 'ADMIN' | 'CLIENT';
	phone: string;
}

export default async function createAgenteAction({
	agent,
}: {
	agent: CreateAgentProps;
}) {
	try {
		const existUser = await prisma.user.findUnique({
			where: { email: agent.email },
		});

		if (existUser) {
			return {
				success: false,
				message: 'Usuário já tem e-mail cadastrado',
				user: null,
			};
		}
		const user = await prisma.user.create({
			data: {
				email: agent.email,
				phone: agent.phone,
				name: agent.name,
				password: await bcrypt.hash('password', 10),
				cpf: agent.cpf,
				role: agent.role,
			},
		});
		console.log('cadastrado');
		//enviar e-mail de confirmação de cadastro
		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Novo Usuário Cadastrado',
			htmlContent: generateContenNewUser({ name: agent.name }),
		});

		revalidateTag('users');
		return {
			success: true,
			message: 'Usuário cadastrado com sucesso',
			user: user,
		};
	} catch (error) {
		console.log('não cadastrado');
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			user: null,
		};
	}
}
