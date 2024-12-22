/** @format */

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
	ChevronUp,
	CircleHelp,
	CircleUserRound,
	Home,
	Inbox,
	UsersRound,
	User2,
	UserRoundCog,
	Wallet,
} from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import SignOutBtn from './sign-out';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

export async function AppSidebar() {
	const session = await getServerSession();
	const items = [
		{
			title: 'Home',
			url: '/dashboard',
			icon: Home,
		},
		{
			title: 'Meus Benefícios',
			url: '/dashboard/benefits',
			icon: Inbox,
		},
		{
			title: 'Dependentes',
			url: '/dashboard/dependents',
			icon: UsersRound,
		},
		{
			title: 'Planos e Pagamentos',
			url: '/dashboard/billing',
			icon: Wallet,
		},
		{
			title: 'Ajuda e Suporte',
			url: '/dashboard/help',
			icon: CircleHelp,
		},
	];

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader />
			<SidebarContent className='bg-slate-100'>
				<SidebarGroup>
					<SidebarGroupLabel>ABBMA</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								{session?.user.role == 'ADMIN' && (
									<SidebarMenuButton
										asChild
										variant={'default'}>
										<Link href={'/dashboard/admin'}>
											<UserRoundCog />
											<span>Admin</span>
										</Link>
									</SidebarMenuButton>
								)}
							</SidebarMenuItem>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> {session?.user.name}
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side='top'
								className='w-[--radix-popper-anchor-width] space-y-2'>
								<DropdownMenuItem
									className='cursor-pointer w-full flex items-center justify-center h-10 px-4 py-2'
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
