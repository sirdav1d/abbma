/** @format */

import { getUserAction } from '@/actions/user/get-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ChevronUp, CircleUserRound, User2 } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { AdminSidebarMenu } from './admin-sidebar-menu';
import { MySidebarMenu } from './my-sidebar-menu';
import SignOutBtn from './sign-out';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

export async function AppSidebar() {
	const session = await getServerSession();
	const user = session && (await getUserAction(session.user.email));

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
									<AdminSidebarMenu />
								</>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				)}{' '}
				<SidebarGroup>
					<SidebarGroupLabel>Aplicação</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<MySidebarMenu />
						</SidebarMenu>{' '}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> {user?.user?.name}
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side='top'
								className='w-[--radix-popper-anchor-width] space-y-2'>
								<DropdownMenuItem
									className='cursor-pointer w-full flex items-center justify-center h-10 px-4 py-2 hover:bg-primary hover:text-slate-50'
									asChild>
									<Link href={'/dashboard/profile'}>
										<CircleUserRound />
										Perfil
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<SignOutBtn />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
