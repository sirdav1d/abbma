/** @format */

'use server';

import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';

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

	const htmlContent = `
			<html>
				<body>
					<p>Olá ${name},</p>
					<p>Nosso compromisso é proporcionar aos associados e dependentes, acesso a uma ampla gama de benefícios, através de parcerias privadas, que visam facilitar o bem-estar, educação e saúde, além de oferecer vantagens financeiras, através de descontos e gratuidades.</p><br/>
					<p>Suas credenciais de acesso: <strong>${email} - ${password}</strong></p>
					<br/>	<br/>
					<p>Se você não solicitou essa assinatura, por favor, ignore este e-mail.</p>
				</body>
			</html>
		`;
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

		const response = await fetch('https://api.brevo.com/v3/smtp/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-key': apiKey,
			} as HeadersInit, // Casting explícito para HeadersInit
			body: JSON.stringify({
				sender: {
					email: process.env.BREVO_SENDER_EMAIL,
					name: process.env.BREVO_SENDER_NAME,
				},
				to: [{ email }],
				subject: 'Bem vindo a ABBMA',
				htmlContent,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			return {
				error: error.message || 'Erro ao enviar o e-mail.',
				succes: false,
				user: null,
			};
		}
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
