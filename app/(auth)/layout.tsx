/** @format */

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	if (session) {
		redirect('/dashboard');
	}
	return <div>{children}</div>;
}
