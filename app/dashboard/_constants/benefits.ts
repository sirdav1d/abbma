/** @format */

import { associate } from '@/constants/associate';
import { healthPlan } from '@/constants/health-plan';
import { telemedicine } from '@/constants/telemedicine';
import { Gift, ScanHeart, Stethoscope } from 'lucide-react';

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
		content: `Nosso serviço de Telemedicina proporciona acesso rápido e conveniente a cuidados médicos de qualidade, 24 horas por dia, 7 dias por semana. Com este benefício, você tem acesso a:`,
		item_benefits: telemedicine,
	},
	{
		id: 'HEALTH_PLAN',
		title: 'Seguros e Planos de Saúde',
		icon: ScanHeart,
		content: `Proteja o que é mais importante! Conte com vantagens exclusivas em diversos Seguros e Planos de Saúdes, garantindo mais tranquilidade para você e sua família. As possibiliades de planos e seguros são:`,
		item_benefits: healthPlan,
	},
];
