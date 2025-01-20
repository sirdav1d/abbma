/*
  Warnings:

  - You are about to drop the column `userId` on the `Updates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Updates" DROP CONSTRAINT "Updates_userId_fkey";

-- AlterTable
ALTER TABLE "Updates" DROP COLUMN "userId";
