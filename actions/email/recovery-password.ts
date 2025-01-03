/** @format */

'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

interface RecoveryPassActionProps {
	email: string;
}

export default async function RecoveryPassAction({
	email,
}: RecoveryPassActionProps) {
	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

	const user = await prisma.user.findUnique({
		where: { email },
	});

	try {
		const newPassword = Math.random().toString(36).slice(2);
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await prisma.user.update({
			where: { id: user?.id },
			data: {
				password: hashedPassword,
			},
		});

		const resp = await fetch(`${API_ENDPOINT}/api/forgot-password-route`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				name: user?.name,
				password: newPassword,
			}),
		});
		return resp.json();
	} catch (error) {
		return {
			ok: false,
			message: error,
		};
	}
}
