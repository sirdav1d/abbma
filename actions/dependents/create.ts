/** @format */

'use server';

import { prisma } from '@/lib/prisma';

interface CreateDependentProps {
	address: string;
	cep: string;
	city: string;
	cpf: string;
	date_birth: string;
	degree: string;
	email: string;
	name: string;
	phone: string;
	neighborhood: string;
	state: string;
	userId: string;
}

export async function createDependentAction({
	address,
	cep,
	city,
	cpf,
	date_birth,
	degree,
	email,
	name,
	phone,
	neighborhood,
	state,
	userId,
}: CreateDependentProps) {
	try {
		const user = await prisma.dependent.create({
			data: {
				name: name,
				degree: degree,
				address: address,
				cep: cep,
				city: city,
				cpf: cpf,
				date_birth: date_birth,
				email: email,
				neighborhood: neighborhood,
				phone: phone,
				state: state,
				userId: userId,
				isActive: true,
			},
		});
		console.log('depedente cadastrado');
		//enviar e-mail de confirmação de cadastro
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
