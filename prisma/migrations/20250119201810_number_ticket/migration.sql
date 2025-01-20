-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'CANCELED';

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "number" SERIAL NOT NULL;
