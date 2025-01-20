/** @format */

'use server';

import { prisma } from '@/lib/prisma';


export default async function GetAllTicketsCustomAction() {

  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        user: true
      }
    });


    return { success: true, message: `Deu certo`, data: tickets };
  } catch (error) {
    return {
      success: false,
      message: `Algo deu errado - ${error}`,
      data: null,
    };
  }
}
