/** @format */

'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

export default function SignOutBtn() {
	return (
		<Button
			variant={'destructive'}
			type='submit'
			className='w-full'
			onClick={() => signOut({ redirect: true })}>
			Sair
			<LogOut />
		</Button>
	);
}
