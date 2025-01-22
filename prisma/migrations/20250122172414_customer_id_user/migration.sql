/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Dependent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dependent" DROP COLUMN "customer_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customer_id" TEXT;
