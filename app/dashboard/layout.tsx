/** @format */

import { AppSidebar } from '@/components/app-sidebar';
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
