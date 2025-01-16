/** @format */

import {
	BriefcaseMedical,
	ClipboardPlus,
	Clock,
	Hospital,
	MapPinHouse,
	Sprout,
} from 'lucide-react';

export const telemedicineBenefits = [
	{
		title: 'Acesso Imediato a Médicos',
		description:
			'Consultas disponíveis 24/7, sem necessidade de agendamento prévio.',
		icon: BriefcaseMedical,
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
		title: 'Exames e Laudos',
		description:
			'Orientação para realização de exames e interpretação dos resultados.',
		icon: ClipboardPlus,
	},
	{
		title: 'Apoio à Saúde Mental',
		description:
			'Consultas com psicólogos e psiquiatras disponíveis rapidamente.',
		icon: Sprout,
	},
];
