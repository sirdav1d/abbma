/*
  Warnings:

  - You are about to drop the column `address` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Dependent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Dependent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dependent" DROP COLUMN "address",
DROP COLUMN "cep",
DROP COLUMN "city",
DROP COLUMN "neighborhood",
DROP COLUMN "state",
ADD COLUMN     "ticketId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Dependent_cpf_key" ON "Dependent"("cpf");

-- AddForeignKey
ALTER TABLE "Dependent" ADD CONSTRAINT "Dependent_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
