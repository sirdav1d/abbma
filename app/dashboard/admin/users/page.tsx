/** @format */

import { getUserAction } from '@/actions/user/get-user';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { DataTableDemo } from './_components/users-table';
import { User } from '@prisma/client';

export default async function UsersAdminPage() {
	const session = await getServerSession();
	const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
	if (!session) {
		redirect('/login');
	}

	const user = await getUserAction({ email: session.user.email });

	if (user.user?.role !== 'ADMIN') {
		redirect('/dashboard');
	}

	const res = await fetch(`${baseUrl}/api/get-all-users`, {
		method: 'GET',
		cache: 'force-cache',
		next: { tags: ['users'] },
	});

	const data = await res.json();

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<Card className='mt-0'>
				<CardHeader>
					<div className='flex flex-col md:flex-row gap-5 justify-between items-center'>
						<div>
							<CardTitle className='text-2xl font-bold'>
								Gerenciamento de Usuários
							</CardTitle>
							<CardDescription>
								Gerencie seus usuários, defina permissões de acesso e ajuste sua
								visualização
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{data.users && data.success && (
						<DataTableDemo
							data={data.users.filter((user: User) => user.isActive)}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
