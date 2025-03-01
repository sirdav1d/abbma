/** @format */

import { getUserAction } from '@/actions/user/get-user';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
} from '@/components/ui/sidebar';

import { AdminSidebarMenu } from './admin-sidebar-menu';
import { MySidebarMenu } from './my-sidebar-menu';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';

export async function AppSidebar() {
	const session = await auth();
	const user = session && (await getUserAction({ email: session.user.email }));

	if (!user?.user) {
		redirect('/login');
	}

	return (
		<Sidebar
			collapsible='icon'
			className=''>
			<SidebarContent className='bg-slate-100'>
				{user?.user?.role !== 'CLIENT' && (
					<SidebarGroup>
						<SidebarGroupLabel>Admin</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<>
									<AdminSidebarMenu user={user?.user} />
								</>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				)}{' '}
				{user?.user?.role !== 'AGENT' && (
					<SidebarGroup>
						<SidebarGroupLabel>Aplicação</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<MySidebarMenu isSub={user?.user?.isSubscribed ?? false} />
							</SidebarMenu>{' '}
						</SidebarGroupContent>
					</SidebarGroup>
				)}
			</SidebarContent>
		</Sidebar>
	);
}
