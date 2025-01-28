/** @format */

import { Button } from '@/components/ui/button';
import { $Enums } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface BtnAccessPlatformProps {
	href: string;
	status: $Enums.Status;
	text?: string;
}

export default function BtnAccessPlatform(props: BtnAccessPlatformProps) {
	return (
		<>
			{props.status === 'COMPLETED' && (
				<Button
					asChild
					className='w-full'>
					<Link
						target='_blank'
						href={props.href}>
						{props.text ?? 'Acessar Plataforma'} <ArrowRight />
					</Link>
				</Button>
			)}
		</>
	);
}
