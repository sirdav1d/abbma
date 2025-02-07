/** @format */

'use server';

import { prisma } from '@/lib/prisma';

import { redirect } from 'next/navigation';
import { getUserAction } from '../user/get-user';
import { auth } from '@/lib/auth/auth';

export default async function GetAllDependentsAction() {
	const session = await auth();

	if (!session) {
		redirect('/login');
	}

	const { user } = await getUserAction({ email: session.user.email });
	try {
		const dependents = await prisma.dependent.findMany({
			where: { userId: user?.id },
		});

		return { success: true, message: `Deu certo`, dependents: dependents };
	} catch (error) {
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			dependents: null,
		};
	}
}
