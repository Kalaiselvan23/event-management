-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_priceClassId_fkey" FOREIGN KEY ("priceClassId") REFERENCES "PriceClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
