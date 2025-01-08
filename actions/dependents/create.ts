/** @format */

'use server';

import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';

interface CreateDependentProps {
	email: string;
	password: string;
	name: string;
	phone: string | null;
	cpf: string;
}

export async function createDependentAction({
	email,
	name,
	phone,
	cpf,
}: CreateDependentProps) {
	try {
		const user = await prisma.dependent.create({
			data: {
				email,
				phone,
				name,
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
