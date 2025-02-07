/** @format */

import DeleteAccountModal from '@/components/delete-account-modal';
import ProfileForm from '@/components/forms/profile-form';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/auth/auth';

export default async function ProfilePage() {
	const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

	const session = await auth();
	console.log(session);
	const res = await fetch(`${baseUrl}/api/get-user-by-email`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(session?.user.email),
		next: { revalidate: 3600 },
	});

	const data = await res.json();

	return (
		<div className='max-w-7xl mx-auto px-4 py-5 w-full 2xl:px-0'>
			<h2 className='font-semibold text-lg md:text-2xl text-pretty'>
				Gerencie seus dados
			</h2>
			<div className='mt-5'>
				{data.user && <ProfileForm user={data.user} />}
			</div>
			<Separator className='my-5' />
			<div className='w-full flex'>
				<DeleteAccountModal />
			</div>
		</div>
	);
}
