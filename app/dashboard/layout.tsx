/** @format */

import { AppSidebar } from '@/components/app-sidebar';
import HeaderDash from '@/components/header-dashboard';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	if (!session?.user) {
		console.log(session?.user);
		redirect('/login');
	}
	return (
		<div className='bg-slate-50'>
			<SidebarProvider>
				<AppSidebar />

				<div className='w-full'>
					<SidebarTrigger />
					<HeaderDash />
					{children}
				</div>
			</SidebarProvider>
		</div>
	);
}
