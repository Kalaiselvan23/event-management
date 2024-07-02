-- DropIndex
DROP INDEX "Ticket_id_key";

-- AlterTable
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");
