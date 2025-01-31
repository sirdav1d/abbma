/** @format */

import logo from '@/assets/logo-principal.png';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Dependent, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export default function License({
	user,
	isTitular,
	isPageShare,
}: {
	user: User | Dependent;
	isTitular: boolean;
	isPageShare: boolean;
}) {
	return (
		<div>
			<Link
				href={`/licenseShare/${user.id}`}
				className={`${isPageShare ? 'max-w-2xl md:scale-125' : 'max-w-lg'}`}>
				<Card
					className={`${isPageShare ? 'max-w-2xl md:scale-125' : 'max-w-lg'}  shadow-lg `}>
					<CardHeader>
						<CardTitle className='flex gap-5 items-center'>
							{user?.name}
						</CardTitle>
						<CardDescription className='font-semibold mt-2'>
							{user?.email}
						</CardDescription>
					</CardHeader>
					<CardContent className='flex items-center w-full gap-10'>
						<div className='flex flex-col w-full gap-2 text-sm '>
							<p>CPF: {user?.cpf}</p>
							<p>Nascimento: {user?.date_birth}</p>
							<p className='font-semibold'>
								Tipo de usuário: {isTitular ? 'Titular' : 'Dependente'}
							</p>
						</div>
						<Image
							src={logo}
							alt='logo ABBMA'
							width={180}
							height={180}
							className='xl:w-24 w-12 object-contain'></Image>
					</CardContent>
					<CardFooter className='w-full flex justify-center items-center mx-auto text-xs text-center'>
						Cadastro em: {new Date(user?.createdAt).toLocaleString('pt-BR')}
					</CardFooter>
				</Card>
			</Link>
		</div>
	);
}
