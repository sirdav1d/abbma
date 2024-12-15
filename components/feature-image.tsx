/** @format */
'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface MotionImageProps {
	children: React.ReactNode;
	delay?: number;
}
export default function MotionImage({ children, delay }: MotionImageProps) {
	return (
		<motion.div
			initial={{ x: 80 }}
			transition={{ duration: 0.5, delay: delay }}
			whileInView={{ x: 0 }}
			viewport={{ once: true }}>
			{children}
		</motion.div>
	);
}
