/** @format */

'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { CircleHelp, Home, Inbox, UsersRound, Wallet } from 'lucide-react';
import Link from 'next/link';
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

export function MySidebarMenu() {
	const pathname = usePathname();

	return (
		<>
			{items.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton
						asChild
						className={pathname === item.url ? 'bg-primary text-slate-50' : ''}>
						<Link href={item.url}>
							<item.icon className='mr-2 h-4 w-4' />
							{item.title}
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</>
	);
}
