/** @format */

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { DataTableDemo } from './_components/users-table';
import { getAllUserAction } from '@/actions/user/get-all-users';

export default async function UsersAdminPage() {
	const session = await getServerSession();

	if (!session?.user?.email && session?.user.role !== 'ADMIN') {
		redirect('/dashboard');
	}
	const { users, success } = await getAllUserAction();
	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty capitalize'>
				gerencie seus usuários e defina permissões de acesso
			</h2>

			<div className='mt-10'>
				{users && success && (
					<DataTableDemo data={users.filter((user) => user.isActive)} />
				)}
			</div>
		</div>
	);
}
