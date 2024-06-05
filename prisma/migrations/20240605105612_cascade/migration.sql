-- DropForeignKey
ALTER TABLE "EventsOnCategory" DROP CONSTRAINT "EventsOnCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "EventsOnCategory" DROP CONSTRAINT "EventsOnCategory_eventId_fkey";

-- DropForeignKey
ALTER TABLE "PriceClass" DROP CONSTRAINT "PriceClass_eventId_fkey";

-- AddForeignKey
ALTER TABLE "EventsOnCategory" ADD CONSTRAINT "EventsOnCategory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsOnCategory" ADD CONSTRAINT "EventsOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceClass" ADD CONSTRAINT "PriceClass_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
