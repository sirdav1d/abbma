/** @format */
'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureImageProps {
	children: React.ReactNode;
	delay?: number;
}
export default function FeatureImage({ children, delay }: FeatureImageProps) {
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
