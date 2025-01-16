/** @format */

'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
export default function BgTelemedicina() {
	const isMobile = useIsMobile();
	return (
		<>
			<motion.span
				whileInView={{ scale: isMobile ? 1 : 0.97 }}
				initial={{ scale: 1 }}
				exit={{ scale: 1 }}
				transition={{ duration: 1, delay: 0.2, type: 'spring' }}
				className={`h-full w-full ${isMobile ? 'rounded-none' : 'rounded-3xl'}  absolute left-0 top-0 bg-slate-950/20 scale-95 bg-[url('/bg-hero-telemedicine.png')] bg-blend-darken object-center`}
			/>
		</>
	);
}
