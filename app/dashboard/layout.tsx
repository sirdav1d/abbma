/** @format */

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	if (!session) {
		redirect('/login');
	}
	return (
		<div>
			<SidebarProvider>
				<AppSidebar />
				<div>
					<SidebarTrigger />
					{children}
				</div>
			</SidebarProvider>
		</div>
	);
}
