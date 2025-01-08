
/** @format */

'use server';


import { prisma } from '@/lib/prisma';

export default async function GetAllDependentsAction() {
  try {
    const dependents = await prisma.dependent.findMany();
    return { success: true, message: `Deu certo`, data: dependents };
  } catch (error) {
    return {
      success: false,
      message: `Algo deu errado - ${error}`,
      data: null,
    };
  }
}
