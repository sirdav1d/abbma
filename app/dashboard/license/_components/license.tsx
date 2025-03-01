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
import QrCode from './qr-code';

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
				className={`${isPageShare ? 'max-w-2xl md:scale-125 cursor-default' : 'max-w-lg'}`}>
				<Card
					className={`${isPageShare ? 'max-w-2xl md:scale-125' : 'max-w-lg'}  shadow-lg `}>
					<CardHeader>
						<CardTitle className='flex flex-col md:flex-row gap-5 md:items-center'>
							<Image
								src={logo}
								alt='logo ABBMA'
								width={180}
								height={180}
								className='xl:w-20 w-12 object-contain'></Image>
							{user?.name}
						</CardTitle>
						<CardDescription className='font-semibold mt-5 text-sm md:text-base'>
							{user?.email}
						</CardDescription>
					</CardHeader>
					<CardContent className='flex items-center w-full gap-10'>
						<div className='flex flex-col w-full gap-2 text-sm '>
							<p className='text-sm md:text-base'>CPF: {user?.cpf}</p>
							<p className='text-sm md:text-base'>
								Nascimento: {user?.date_birth}
							</p>
							<p className='font-semibold text-sm md:text-base'>
								Tipo de usuário: {isTitular ? 'Titular' : 'Dependente'}
							</p>
						</div>

						<QrCode value={`www.abbma.org.br/licenseShare/${user.id}`} />
					</CardContent>
					<CardFooter className='w-full flex justify-center items-center mx-auto text-xs text-center text-muted-foreground'>
						Cadastro em: {new Date(user?.createdAt).toLocaleString('pt-BR')}
					</CardFooter>
				</Card>
			</Link>
		</div>
	);
}
