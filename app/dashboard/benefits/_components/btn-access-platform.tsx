/** @format */

import { Button } from '@/components/ui/button';
import { $Enums } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface BtnAccessPlatformProps {
	href: string;
	status: $Enums.Status;
}

export default function BtnAccessPlatform(props: BtnAccessPlatformProps) {
	return (
		<>
			{props.status === 'COMPLETED' ? (
				<Button
					asChild
					className='w-full'>
					<Link
						target='_blank'
						href={props.href}>
						Acessar Plataforma <ArrowRight />
					</Link>
				</Button>
			) : (
				<Button
					variant={'ghost'}
					className='w-full cursor-not-allowed'>
					Estamos Liberando Seu Acesso em até 48hrs
				</Button>
			)}
		</>
	);
}
