/** @format */

'use client';

import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';
import React from 'react';

export default function MotionAsset() {
	return (
		<motion.div
			className='absolute inset-0 z-0 opacity-50'
			initial={{ opacity: 0 }}
			animate={{ opacity: 0.5 }}
			transition={{ duration: 1 }}>
			<Triangle className='absolute top-20 left-20 text-blue-300 w-24 h-24' />
			<div className='absolute bottom-20 right-20 w-32 h-32 rounded-full bg-blue-300' />
			<div className='absolute top-1/2 left-1/3 w-40 h-40 rotate-45 bg-blue-200' />
		</motion.div>
	);
}
