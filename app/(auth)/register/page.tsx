/** @format */

import loginImage from '@/assets/Fill-bro.png';
import logo from '@/assets/logo-principal.png';
import MotionImage from '@/components/feature-image';
import RegisterForm from '@/components/forms/register-form';
import { FadeText } from '@/components/ui/fade-text';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
	return (
		<div className='grid min-h-screen lg:grid-cols-2 bg-slate-200 w-full'>
			<div className='flex flex-col gap-6 p-4  w-full h-full items-center justify-center'>
				<Link
					href='/'
					className='flex items-center gap-2 font-medium'>
					<Image
						src={logo}
						alt='logo ABBMA'
						width={200}
						height={200}
						className=' h-auto w-28'></Image>
				</Link>

				<RegisterForm />
			</div>
			<div className='relative hidden bg-gradient-to-br px-5 from-blue-600 to-blue-950 lg:flex w-full h-full justify-center flex-col items-center text-balance'>
				<FadeText>
					<h2 className='font-bold text-4xl max-w-xl leading-tight text-center text-slate-50'>
						Aproveite todas as vantagens que só a{' '}
						<span className='text-yellow-500'>ABBMA</span> oferece
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
