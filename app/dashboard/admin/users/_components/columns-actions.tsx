/** @format */

// import { deleteUserAction } from '@/actions/deleteUser';
import { User } from '@prisma/client';
import ModalDeleteUser from './modal-delete-user';
import ModalManageUser from './modal-manage-user';

export default function ColumnActions({ user }: { user: Partial<User> }) {
	return (
		<div className='flex gap-2'>
			<ModalManageUser user={user} />
			<ModalDeleteUser />
		</div>
	);
}
