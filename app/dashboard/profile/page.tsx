/** @format */

import { getUserAction } from '@/actions/user/get-user';
import DeleteAccountModal from '@/components/delete-account-modal';
import ProfileForm from '@/components/forms/profile-form';
import { Separator } from '@/components/ui/separator';

import { getServerSession } from 'next-auth';

export default async function ProfilePage() {
	const session = await getServerSession();
	const email = session?.user?.email;
	const user = email && (await getUserAction({ email }));

	return (
		<div className='max-w-7xl mx-auto px-4 py-5 w-full 2xl:px-0'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
				Gerencie seus dados
			</h2>
			<div className='mt-5'>
				{session?.user && user && <ProfileForm user={user.user!} />}
			</div>
			<Separator className='my-5' />
			<div className='w-full flex'>
				<DeleteAccountModal />
			</div>
		</div>
	);
}
