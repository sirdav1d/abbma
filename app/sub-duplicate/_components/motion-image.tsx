/** @format */

'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import duplicate from '@/assets/Duplicate-bro.png';

export default function MotionImage() {
	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}>
			<Image
				src={duplicate}
				alt='Homem tomando notas'
				width={200}
				height={200}
			/>
		</motion.div>
	);
}
