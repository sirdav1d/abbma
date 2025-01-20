/** @format */

'use server';

import { prisma } from '@/lib/prisma';

interface createUpdatesActionProps {
  ticketId: string;
  message: string;
  authorName: string;
}

export async function createUpdatesAction({ ticketId, message, authorName }: createUpdatesActionProps) {
  try {
    const newUpdate = await prisma.updates.create({
      data: {
        ticketId: ticketId,
        message: message,
        authorName: authorName
      }
    });

    return {
      success: true,
      message: 'Atualização cadastrado com sucesso',
      data: newUpdate,
    };
  } catch (error) {
    console.log('Atualização não cadastrada');
    return {
      success: false,
      message: `Algo deu errado - ${error}`,
      data: null,
    };
  }
}
