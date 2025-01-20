/** @format */

'use server';

import { prisma } from '@/lib/prisma';


export default async function GetTicketByIdAction(id: string) {

  try {
    const ticket = await prisma.ticket.findUnique({

      where: { id: id },
      include: {
        user: true,
        Updates: true
      },
    });
    return { success: true, message: `Deu certo`, data: ticket };
  } catch (error) {
    return {
      success: false,
      message: `Algo deu errado - ${error}`,
      data: null,
    };
  }
}
