/** @format */

import { associate } from '@/constants/associate';
import { Gift, Stethoscope } from 'lucide-react';

export const benefits = [
	{
		id: 'CLUB_VANTAGES',
		title: 'Clube de Vantagens',
		icon: Gift,
		content: `Nosso Clube de Vantagens é uma plataforma exclusiva que oferece uma ampla gama de descontos e ofertas especiais em diversos estabelecimentos parceiros. Como membro, você terá acesso a:`,
		item_benefits: associate,
	},
	{
		id: 'TELEMEDICINE',
		title: 'Telemedicina',
		icon: Stethoscope,
		content: `Nosso serviço de Telemedicina proporciona acesso rápido e conveniente a cuidados médicos de qualidade, 24 horas por dia, 7 dias por semana.`,
		item_benefits: [],
	},
];
