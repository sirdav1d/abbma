/** @format */

'use client';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useState } from 'react';

interface BtnRevealProps {
	email: string;
	password: string;
}

export default function BtnReveal(props: BtnRevealProps) {
	const [show, setShow] = useState(false);

	const session = useSession();

	return (
		<div className='flex items-center gap-5 flex-col md:flex-row'>
			<Button
				variant={'outline'}
				onClick={() => setShow(!show)}>
				{show ? (
					<>
						Esconder Credenciais <EyeOff />
					</>
				) : (
					<>
						{' '}
						Revelar Credenciais <Eye />
					</>
				)}
			</Button>

			<div className='flex flex-col gap-2 text-muted-foreground text-sm'>
				<p>E-mail: {show ? session.data?.user.email : ' ********'}</p>
				<p>Senha: {show ? props.password : ' ********'}</p>
			</div>
		</div>
	);
}
