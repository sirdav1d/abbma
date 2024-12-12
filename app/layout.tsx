/** @format */

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'ABBMA',
	description:
		'Associação Brasileira de Benefícios para Militares e Autônomos, nosso compromisso é proporcionar aos seus associados e dependentes, acesso a uma ampla gama de benefícios, através de parcerias privadas, que visam facilitar o bem-estar, educação e saúde ',
	icons: ['/abbma-favicon.png'],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`${poppins.className}  antialiased`}>{children}</body>
		</html>
	);
}
