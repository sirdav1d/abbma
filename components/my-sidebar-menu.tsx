/** @format */

'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import {
	CircleHelp,
	CircleUserRound,
	Home,
	Inbox,
	UsersRound,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import PortalBtn from './portal-btn';

const items = [
	{
		title: 'Home',
		url: '/dashboard',
		icon: Home,
	},
	{
		title: 'Perfil',
		url: '/dashboard/profile',
		icon: CircleUserRound,
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
		title: 'Ajuda e Suporte',
		url: '/dashboard/help',
		icon: CircleHelp,
	},
];

export function MySidebarMenu() {
	const pathname = usePathname();

	return (
		<SidebarMenuItem className='space-y-2'>
			{items.map((item) => (
				<SidebarMenuButton
					key={item.title}
					asChild
					className={pathname === item.url ? 'bg-primary text-slate-50' : ''}>
					<a href={item.url}>
						<item.icon className='mr-2 h-4 w-4' />
						<span className='text-base md:text-sm'>{item.title}</span>
					</a>
				</SidebarMenuButton>
			))}

			<PortalBtn />
		</SidebarMenuItem>
	);
}
