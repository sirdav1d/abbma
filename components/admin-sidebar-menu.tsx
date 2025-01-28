/** @format */

'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { User } from '@prisma/client';
import { ListTodo, UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebarMenu({ user }: { user?: User }) {
	const pathname = usePathname();

	return (
		<div className='space-y-2'>
			<SidebarMenuItem>
				<SidebarMenuButton
					asChild
					className={
						pathname === '/dashboard/admin' ? 'bg-primary text-slate-50' : ''
					}>
					<Link
						prefetch
						href={'/dashboard/admin'}>
						<ListTodo className='mr-2 h-4 w-4' />
						<span className='text-base md:text-sm'>Gestão de Tarefas</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
			{user?.role == 'ADMIN' && (
				<SidebarMenuItem>
					<SidebarMenuButton
						asChild
						className={
							pathname === '/dashboard/admin/users'
								? 'bg-primary text-slate-50'
								: ''
						}>
						<Link
							prefetch
							href={'/dashboard/admin/users'}>
							<UserCog className='mr-2 h-4 w-4' />
							<span className='text-base md:text-sm'>Gestão de usuários</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			)}
		</div>
	);
}
