/** @format */

'use server';

import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';
import SendEmailAction from '../email/sendEmail';
import {
	generateContenNewUser,
	generateContentWelcome,
} from '@/constants/email-contents';
import { revalidateTag } from 'next/cache';

interface CreateUserProps {
	email: string;
	password: string;
	name: string;
	phone: string | null;
	cpf: string;
	date_birth: string;
	isMilitary: string;
}

export async function createUserAction({
	email,
	name,
	phone,
	password,
	cpf,
	date_birth,
	isMilitary,
}: CreateUserProps) {
	const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
	if (!apiKey) {
		return {
			success: false,
			message: `Algo deu errado - Sem API Key`,
			user: null,
		};
	}

	try {
		const existUser = await prisma.user.findUnique({
			where: { email: email },
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
				email,
				phone,
				name,
				password: await bcrypt.hash(password, 10),
				cpf: cpf,
				role: 'CLIENT',
				is_militar: isMilitary == 'military' ? true : false,
				date_birth,
			},
		});

		await SendEmailAction({
			email: email,
			subject: 'Bem vindo a ABBMA',
			htmlContent: generateContentWelcome({ name: name }),
		});

		await SendEmailAction({
			email: 'contato@abbma.org.br',
			subject: 'Novo Cliente Cadastrado',
			htmlContent: generateContenNewUser({ name: name }),
		});

		revalidateTag('users');
		//enviar e-mail de confirmação de cadastro
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
