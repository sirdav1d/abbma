-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSED', 'PENDING');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AGENT', 'CLIENT');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('CLUB_VANTAGES', 'TELEMEDICINE', 'HEALTH_PLAN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "is_militar" BOOLEAN,
    "occupation" TEXT,
    "cpf" TEXT,
    "date_birth" TIMESTAMP(3),
    "cep" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "phone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "userId" TEXT NOT NULL,
    "cpf" TEXT,
    "date_birth" TIMESTAMP(3),
    "degree" TEXT NOT NULL,
    "cep" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dependent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "TicketType" NOT NULL DEFAULT 'CLUB_VANTAGES',
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Dependent" ADD CONSTRAINT "Dependent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
