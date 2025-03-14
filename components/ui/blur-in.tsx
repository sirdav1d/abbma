/** @format */

'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface BlurInProps {
	word?: string;
	className?: string;
	variant?: {
		hidden: { filter: string; opacity: number };
		visible: { filter: string; opacity: number };
	};
	duration?: number;
	children?: React.ReactNode;
}
const BlurIn = ({
	word,
	className,
	variant,
	duration = 0.5,
	children = 1,
}: BlurInProps) => {
	const defaultVariants = {
		hidden: { filter: 'blur(10px)', opacity: 0 },
		visible: { filter: 'blur(0px)', opacity: 1 },
	};
	const combinedVariants = variant || defaultVariants;

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			transition={{ duration, delay: 0.2 }}
			viewport={{ once: false }}
			variants={combinedVariants}
			className={cn(
				'font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]',
				className,
			)}>
			{word}
			{children}
		</motion.div>
	);
};

export default BlurIn;
