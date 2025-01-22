/** @format */

'use client';
import { homepageLinks, telemedicinaLinks } from '@/constants/links-header';
import { usePathname } from 'next/navigation';

export default function DesktopHeaderLinks() {
	const pathname = usePathname();
	return (
		<nav>
			{pathname == '/homepage' && (
				<ul className='flex gap-5 font-normal text-base'>
					{homepageLinks.map((l, index) => {
						return (
							<li
								key={index}
								className='hover:text-red-600 text-slate-950 transition-all ease-linear duration-200'>
								<a href={l.href}>{l.label}</a>
							</li>
						);
					})}
				</ul>
			)}

			{pathname == '/telemedicina' && (
				<ul className='flex gap-5 font-normal text-base'>
					{telemedicinaLinks.map((l, index) => {
						return (
							<li
								key={index}
								className='hover:text-red-600 text-slate-950 transition-all ease-linear duration-200'>
								<a href={l.href}>{l.label}</a>
							</li>
						);
					})}
				</ul>
			)}
		</nav>
	);
}
