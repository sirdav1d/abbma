/** @format */

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ArrowDown, ArrowUp, Check } from 'lucide-react';
import { useState } from 'react';

const planFeatures = [
	'Clube de Vantagens',
	'Telemedicina',
	'Plano de Saúde',
	'Suporte 24/7',
];

const paymentHistory = [
	{
		date: '01/05/2024',
		amount: 'R$ 6,90',
		status: 'Pago',
		link: 'fdafdafdafdafdafda',
	},
	{
		date: '01/04/2024',
		amount: 'R$ 6,90',
		status: 'Pago',
		link: 'fdafdafdafdafdafda',
	},
	{
		date: '01/03/2024',
		amount: 'R$ 6,90',
		status: 'Pago',
		link: 'fdafdafdafdafdafda',
	},
];

export default function BillingPage() {
	const [showPaymentHistory, setShowPaymentHistory] = useState(false);

	return (
		<div className='max-w-7xl mx-auto px-4 2xl:px-0 py-5'>
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
						<Button
							className='w-full md:w-fit'
							onClick={() => setShowPaymentHistory(!showPaymentHistory)}>
							{showPaymentHistory ? (
								<>
									Ocultar Histórico <ArrowUp />
								</>
							) : (
								<>
									Ver Histórico <ArrowDown />
								</>
							)}
						</Button>
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
										<TableHead>Link da Fatura</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{paymentHistory.map((payment, index) => (
										<TableRow key={index}>
											<TableCell>{payment.date}</TableCell>
											<TableCell>{payment.amount}</TableCell>
											<TableCell>{payment.status}</TableCell>
											<TableCell>{payment.link}</TableCell>
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
