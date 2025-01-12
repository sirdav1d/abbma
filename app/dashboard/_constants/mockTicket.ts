/** @format */

export const mockTicket = {
	id: 1,
	number: 'T-001',
	clientName: 'João Silva',
	benefitType: 'Clube de Vantagens',
	description:
		'Cliente relatou dificuldade em acessar os descontos da loja parceira XYZ. Não consegue visualizar as ofertas na plataforma.',
	status: 'Em Andamento',
	openDate: '2024-03-01',
	updates: [
		{
			date: '2024-03-01 10:00',
			message: 'Chamado aberto pelo cliente',
			author: 'Sistema',
		},
		{
			date: '2024-03-01 14:30',
			message:
				'Análise inicial realizada. Entraremos em contato com a loja parceira para verificar o problema.',
			author: 'Operador: Maria',
		},
		{
			date: '2024-03-02 11:15',
			message:
				'Loja parceira confirmou problema técnico. Estão trabalhando na correção.',
			author: 'Operador: Carlos',
		},
	],
	clientMessages: [
		{
			date: '2024-03-01 10:00',
			message:
				'Olá, não estou conseguindo ver os descontos da loja XYZ. Podem me ajudar?',
		},
		{
			date: '2024-03-02 09:30',
			message: 'Bom dia, alguma novidade sobre meu problema?',
		},
	],
};
