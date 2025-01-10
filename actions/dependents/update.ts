/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface UpdateDependentProps {
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
	id: string;
}

export async function updateDependentAction({
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
				address: address,
				cep: cep,
				city: city,
				cpf: cpf,
				date_birth: date_birth,
				email: email,
				neighborhood: neighborhood,
				phone: phone,
				state: state,
			},
		});
		console.log('depedente atualizado');
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
