/*
  Warnings:

  - Added the required column `authorName` to the `Updates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Updates" ADD COLUMN     "authorName" TEXT NOT NULL;
