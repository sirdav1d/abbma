/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getUserAction } from '../user/get-user';

export default async function GetAllDependentsAction() {
	const session = await getServerSession();

	if (!session) {
		redirect('/login');
	}

	const { user } = await getUserAction({ email: session.user.email });
	try {
		const dependents = await prisma.dependent.findMany({
			where: { userId: user?.id },
		});
		return { success: true, message: `Deu certo`, data: dependents };
	} catch (error) {
		return {
			success: false,
			message: `Algo deu errado - ${error}`,
			data: null,
		};
	}
}
