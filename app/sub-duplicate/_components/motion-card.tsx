/** @format */
'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import MotionImage from './motion-image';
import Link from 'next/link';

export default function MotionCard() {
	return (
		<motion.div
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.5 }}>
			<Card className='w-full max-w-md bg-white/80 backdrop-blur-sm'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold text-center text-gray-800'>
						Oops! Já temos esse plano
					</CardTitle>
					<CardDescription className='text-center text-gray-600'>
						Parece que você já está inscrito neste plano.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col items-center space-y-4'>
					<MotionImage />
					<AlertCircle className='text-blue-500 w-12 h-12' />
					<p className='text-gray-700 text-center text-sm'>
						Não se preocupe! Você já tem acesso a todos os recursos deste plano.
						Se deseja fazer alterações, visite sua página de gerenciamento de
						assinatura.
					</p>
				</CardContent>
				<CardFooter className='flex justify-center'>
					<Button
						asChild
						size={'lg'}>
						<Link
							href='/homepage'
							className='w-full text-lg'>
							<ArrowLeft className='scale-105' /> Voltar
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
