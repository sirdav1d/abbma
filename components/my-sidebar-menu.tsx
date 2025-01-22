/** @format */

'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { CircleHelp, Home, Inbox, UsersRound } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
		title: 'Ajuda e Suporte',
		url: '/dashboard/help',
		icon: CircleHelp,
	},
];

export function MySidebarMenu() {
	const pathname = usePathname();

	return (
		<div className='space-y-2'>
			{items.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton
						asChild
						className={pathname === item.url ? 'bg-primary text-slate-50' : ''}>
						<a href={item.url}>
							<item.icon className='mr-2 h-4 w-4' />
							<span className='text-base md:text-sm'>{item.title}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</div>
	);
}
