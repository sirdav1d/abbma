/** @format */

'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import {
	CircleHelp,
	CircleUserRound,
	Home,
	Inbox,
	UsersRound,
	Wallet,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import PortalBtn from './portal-btn';
import Link from 'next/link';

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
		title: 'Carteirinha',
		url: '/dashboard/license',
		icon: Wallet,
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

export function MySidebarMenu({ isSub }: { isSub: boolean }) {
	const pathname = usePathname();

	return (
		<SidebarMenuItem className='space-y-2'>
			{items.map((item) => (
				<SidebarMenuButton
					key={item.title}
					asChild
					className={
						pathname === item.url
							? 'bg-primary active:bg-primary active:text-slate-50  text-slate-50'
							: 'active:bg-primary active:text-slate-50'
					}>
					<Link
						prefetch
						href={item.url}>
						<item.icon className='mr-2 h-4 w-4' />
						<span className='text-base md:text-sm'>{item.title}</span>
					</Link>
				</SidebarMenuButton>
			))}
			{isSub && <PortalBtn />}
		</SidebarMenuItem>
	);
}
