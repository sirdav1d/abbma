/** @format */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Check } from 'lucide-react';

const planFeatures = [
	'Clube de Vantagens',
	'Telemedicina',
	'Plano de Saúde',
	'Suporte 24/7',
];

const paymentHistory = [
	{ date: '01/05/2024', amount: 'R$ 6,90', status: 'Pago' },
	{ date: '01/04/2024', amount: 'R$ 6,90', status: 'Pago' },
	{ date: '01/03/2024', amount: 'R$ 6,90', status: 'Pago' },
];

export default function BillingPage() {
	const [showPaymentHistory, setShowPaymentHistory] = useState(false);

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='space-y-6'>
				<Card>
					<CardHeader>
						<CardTitle>Seu Plano Atual</CardTitle>
						<CardDescription>Plano Premium</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex justify-between items-center mb-4'>
							<span className='text-3xl font-bold'>R$ 6,90/mês</span>
							<Badge>Ativo</Badge>
						</div>
						<h3 className='font-semibold mb-2'>Funcionalidades incluídas:</h3>
						<ul className='space-y-1 mb-4'>
							{planFeatures.map((feature, index) => (
								<li
									key={index}
									className='flex items-center'>
									<Check className='h-4 w-4 mr-2 text-green-500' />
									{feature}
								</li>
							))}
						</ul>
						<div className='flex space-x-4'>
							<Button>Atualizar Plano</Button>
							<Button asChild>
								<Link href='/payment'>Assinar Agora</Link>
							</Button>
							<Button
								variant='outline'
								onClick={() => setShowPaymentHistory(!showPaymentHistory)}>
								{showPaymentHistory ? 'Ocultar Histórico' : 'Ver Histórico'}
							</Button>
						</div>
					</CardContent>
				</Card>

				{showPaymentHistory && (
					<Card>
						<CardHeader>
							<CardTitle>Histórico de Pagamentos</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Data</TableHead>
										<TableHead>Valor</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{paymentHistory.map((payment, index) => (
										<TableRow key={index}>
											<TableCell>{payment.date}</TableCell>
											<TableCell>{payment.amount}</TableCell>
											<TableCell>{payment.status}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
