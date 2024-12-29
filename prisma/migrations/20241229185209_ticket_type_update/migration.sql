/*
  Warnings:

  - The values [TELEMEDICINE] on the enum `TicketType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketType_new" AS ENUM ('CLUB_VANTAGES', 'TELEMEDICINE_INDIVIDUAL', 'TELEMEDICINE_COUPLE', 'TELEMEDICINE_FAMILY', 'HEALTH_PLAN');
ALTER TABLE "Ticket" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "type" TYPE "TicketType_new" USING ("type"::text::"TicketType_new");
ALTER TYPE "TicketType" RENAME TO "TicketType_old";
ALTER TYPE "TicketType_new" RENAME TO "TicketType";
DROP TYPE "TicketType_old";
ALTER TABLE "Ticket" ALTER COLUMN "type" SET DEFAULT 'CLUB_VANTAGES';
COMMIT;
