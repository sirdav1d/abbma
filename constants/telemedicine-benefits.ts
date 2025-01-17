/** @format */

import {
	BriefcaseMedical,
	CalendarClock,
	ClipboardPlus,
	Clock,
	Hospital,
	IdCard,
	MapPinHouse,
	Sprout,
} from 'lucide-react';

export const telemedicineBenefits = [
	{
		title: 'Acesso Imediato a Médicos',
		description:
			'Consultas disponíveis 24/7, sem necessidade de agendamento prévio.',
		icon: BriefcaseMedical,
	}, {
		title: 'Sem Limite de Idade',
		description:
			'Consultas com psicólogos e psiquiatras disponíveis rapidamente.',
		icon: IdCard,
	}, {
		title: 'Sem Carência',
		description:
			'Consultas com psicólogos e psiquiatras disponíveis rapidamente.',
		icon: CalendarClock,
	},
	{
		title: 'Economia de Tempo',
		description: 'Elimina deslocamentos e filas em clínicas ou hospitais. ',
		icon: Clock,
	},
	{
		title: 'Conforto e Conveniência',
		description: 'Atendimento no conforto de casa ou qualquer outro local.',
		icon: MapPinHouse,
	},
	{
		title: 'Agilidade em Emergências',
		description:
			'Rapidez no atendimento a sintomas que exigem avaliação imediata.',
		icon: Hospital,
	},
	{
		title: 'Receitas e Pedidos de Exame',
		description:
			'Receba sua receita ou pedido de exame via SMS, E-mail ou Whatsapp',
		icon: ClipboardPlus,
	},
	{
		title: 'Apoio à Saúde Mental',
		description:
			'Consultas com psicólogos e psiquiatras disponíveis rapidamente.',
		icon: Sprout,
	},
];
