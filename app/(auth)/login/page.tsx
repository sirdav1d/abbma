/** @format */

import logo from '@/assets/logo-principal.png';
import LoginForm from '@/components/forms/login-form';
import Image from 'next/image';
import Link from 'next/link';
import loginImage from '@/assets/Login-bro.png';
import { FadeText } from '@/components/ui/fade-text';
import MotionImage from '@/components/feature-image';

export default function LoginPage() {
	return (
		<div className='grid min-h-svh  lg:grid-cols-2 bg-slate-200'>
			<div className='flex flex-col gap-4 p-6 md:p-10 w-full h-full'>
				<div className='flex justify-center gap-2'>
					<Link
						href='/'
						className='flex items-center gap-2 font-medium'>
						<Image
							src={logo}
							alt='logo ABBMA'
							width={200}
							height={200}
							className='w-20 h-auto lg:w-28'></Image>
					</Link>
				</div>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs xl:max-w-sm'>
						<LoginForm />
					</div>
				</div>
			</div>
			<div className='relative hidden bg-gradient-to-br px-5 from-blue-600 to-blue-950 lg:flex w-full h-full justify-center flex-col items-center text-balance'>
				<FadeText>
					<h2 className='font-bold text-4xl max-w-xl leading-tight text-center text-slate-50'>
						Seja bem vindo! Aproveite nossos diversos{' '}
						<span className='text-yellow-500'>benefícios</span>
					</h2>
				</FadeText>
				<MotionImage>
					<Image
						src={loginImage}
						alt='abstrato'
						width={1200}
						height={600}
						className='object-contain w-[480px] h-auto'></Image>
				</MotionImage>
			</div>
		</div>
	);
}
