/** @format */

'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function BgTelemedicina() {
	return (
		<>
			<motion.span
				whileInView={{ scale: 0.97 }}
				initial={{ scale: 1 }}
				exit={{ scale: 1 }}
				transition={{ duration: 1, delay: 0.2, type: 'spring' }}
				className="h-full w-full rounded-3xl absolute left-0 top-0 bg-slate-950/20 scale-95 bg-[url('/bg-hero-telemedicine.png')] bg-blend-darken"
			/>
		</>
	);
}
