/** @format */

'use server';

import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';

interface CreateUserProps {
	email: string;
	password: string;
	name: string;
	phone: string | null;
	cpf: string | null | undefined;
}

export async function createUserWithPaymentAction({
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
			return { success: false, message: 'Usuário já tem e-mail cadastrado' };
		}
		await prisma.user.create({
			data: {
				email,
				phone,
				name,
				cpf: cpf ?? null,
				password: await bcrypt.hash(password, 10),
				role: 'CLIENT',
				tickets: {
					create: {
						title: 'Clube de Vantagens',
						description:
							'usuário já fez o pagamento e aguarda acesso ao clube de vantagens',
						status: 'PENDING',
						type: 'CLUB_VANTAGES',
					},
				},
			},
		});
		console.log('cadastrado');
		//enviar e-mail de confirmação de cadastro
		return { success: true, message: 'Usuário cadastrado com sucesso' };
	} catch (error) {
		console.log('não cadastrado');
		return { success: false, message: `Algo deu errado - ${error}` };
	}
}
