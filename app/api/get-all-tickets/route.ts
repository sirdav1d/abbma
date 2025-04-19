/** @format */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Ticket } from '@prisma/client';

export async function GET() {
	try {
		const Alltickets = await prisma.ticket.findMany({
			include: { user: true, Updates: true, Dependent: true },
		});

		const allDependents = await prisma.dependent.findMany({
			include: { user: true },
		});

		const Activetickets = Alltickets.filter(
			(ticket) => ticket.isActive === true,
		);
		// Verifica se o array de usuários está vazio

		if (Activetickets.length === 0) {
			return NextResponse.json({
				success: false,
				tickets: null,
				ticketCounts: null,
				message: 'Nenhum ticket ativo encontrado',
				error: null,
				status: 404,
			});
		}

		const ticketsWithDeps = Activetickets.filter((ticket) => {
			return allDependents.map((dependent) => {
				if (ticket.userId === dependent.userId) {
					return (ticket.Dependent = dependent);
				}
			});
		});
		// Se encontrar usuários, retorna a resposta com sucesso

		const ticketCounts = {
			total: Activetickets.length,
			pending: Activetickets.filter((t: Ticket) => t.status === 'PENDING')
				.length,
			inProgress: Activetickets.filter(
				(t: Ticket) => t.status === 'IN_PROGRESS',
			).length,
			completed: Activetickets.filter((t: Ticket) => t.status === 'COMPLETED')
				.length,
		};

		const ticketItems = ticketsWithDeps.map(
			(ticket: (typeof ticketsWithDeps)[0]) => {
				return {
					id: ticket.id,
					number: ticket.number,
					name: ticket.user
						? ticket.user.name
						: ticket.Dependent
							? ticket.Dependent.name
							: null,
					userId: ticket.userId,
					type:
						ticket.type == 'CLUB_VANTAGES'
							? 'Clube de Vantagens'
							: ticket.type == 'HEALTH_PLAN'
								? 'Plano de Saúde'
								: 'Telemedicina',
					status:
						ticket.status == 'PENDING'
							? 'Pendente'
							: ticket.status == 'IN_PROGRESS'
								? 'Em Andamento'
								: 'Concluído',
					createdAt: ticket.createdAt,
					hasDependent: ticket.Dependent ? true : false,
				};
			},
		);

		console.log(
			'tickets',
			ticketItems.filter((t) => t.hasDependent),
		);

		return NextResponse.json({
			success: true,
			tickets: ticketItems,
			ticketCounts,
			message: 'tickets encontrados',
			error: null,
			status: 200,
		});
	} catch (error) {
		// Retorne o erro utilizando NextResponse.json, e defina um status apropriado (por exemplo, 500)
		return NextResponse.json({
			success: false,
			message: 'Erro ao buscar tickets',
			tickets: null,
			ticketCounts: null,
			error: error instanceof Error ? error.message : error,
			status: 500,
		});
	}
}
