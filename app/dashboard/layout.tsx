/** @format */

import { AppSidebar } from '@/components/app-sidebar';
import HeaderDash from '@/components/header-dashboard';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

export default async function DashLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='bg-slate-50'>
			<SidebarProvider>
				<AppSidebar />

				<div className='w-full'>
					<SidebarTrigger className='mt-2.5 scale-150 ml-2.5' />
					<HeaderDash />
					{children}
				</div>
			</SidebarProvider>
		</div>
	);
}
