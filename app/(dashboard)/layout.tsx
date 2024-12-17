/** @format */

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

export default function DashLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
