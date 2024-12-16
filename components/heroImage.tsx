/** @format */
'use client';

import React from 'react';
import Image from 'next/image';
import heroImage from '@/assets/beautiful-smiling.png';
import { motion } from 'framer-motion';

export default function HeroImage() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: false }}
			transition={{ duration: 0.5 }}>
			<Image
				src={heroImage}
				alt='Mulher sorrindo olhando para celular'
				width={1280}
				height={800}
				className=' w-full md:w-[680px] object-contain md:absolute md:bottom-0 mt-auto'
			/>
		</motion.div>
	);
}
