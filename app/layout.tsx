/** @format */

import { getUserAction } from '@/actions/user/get-user';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/lib/auth/auth';
import AuthProvider from '@/providers/auth-provider';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import ModalSub from './dashboard/_components/modal-sub';
import './globals.css';

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'ABBMA',
	description:
		'Associação Brasileira de Benefícios para Militares e Autônomos, nosso compromisso é proporcionar aos seus associados e dependentes, acesso a uma ampla gama de benefícios, através de parcerias privadas, que visam facilitar o bem-estar, educação e saúde ',
	icons: ['/logo-principal.png'],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session) {
		console.log('Não Logado');
	}

	const resp = session && (await getUserAction({ email: session?.user.email }));

	const isClient = resp?.user?.role === 'CLIENT';
	const isSub = resp?.user?.isSubscribed;
	return (
		<html
			lang='pt-BR'
			suppressHydrationWarning>
			<body className={`${poppins.className}  antialiased`}>
				<AuthProvider>
					<>
						{session && !isSub && isClient && <ModalSub isOpen={true} />}
						{children}
						<Toaster />
						<Analytics />
					</>
				</AuthProvider>
			</body>
		</html>
	);
}
