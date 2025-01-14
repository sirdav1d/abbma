/** @format */

'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Home, Inbox } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
	{
		title: 'Gestão de Tarefas',
		url: '/dashboard/admin',
		icon: Home,
	},
	{
		title: 'Gestão de usuários',
		url: '/dashboard/admin/users',
		icon: Inbox,
	},
];

export function AdminSidebarMenu() {
	const pathname = usePathname();

	return (
		<div className='space-y-2'>
			{items.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton
						asChild
						className={pathname === item.url ? 'bg-primary text-slate-50' : ''}>
						<Link href={item.url}>
							<item.icon className='mr-2 h-4 w-4' />
							<span className='text-base md:text-sm'>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</div>
	);
}
