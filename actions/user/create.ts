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
}

export async function createUserAction({
	email,
	name,
	phone,
	password,
	cpf,
}: CreateUserProps) {
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
			},
		});
		console.log('cadastrado');
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
