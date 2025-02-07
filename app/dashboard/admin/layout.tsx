/** @format */

import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	if (session?.user?.role === 'CLIENT') {
		redirect('/dashboard');
	}
	return <div>{children}</div>;
}
