/** @format */

import { getUserAction } from '@/actions/user/get-user';
import { AppSidebar } from '@/components/app-sidebar';
import HeaderDash from '@/components/header-dashboard';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}

	const user = await getUserAction({ email: session.user.email });

	if (user.user?.role == 'AGENT') {
		redirect('/dashboard/admin');
	}
	return (
		<div className='bg-slate-50'>
			<SidebarProvider>
				<AppSidebar />
				<div className='w-full'>
					<SidebarTrigger className='mt-2.5 ml-2.5' />
					<HeaderDash />
					{children}
				</div>
			</SidebarProvider>
		</div>
	);
}
