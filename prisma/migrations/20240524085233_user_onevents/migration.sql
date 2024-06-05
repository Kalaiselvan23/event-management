-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_categoryId_fkey";

-- CreateTable
CREATE TABLE "EventsOnCategory" (
    "eventId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "EventsOnCategory_pkey" PRIMARY KEY ("categoryId","eventId")
);

-- CreateTable
CREATE TABLE "UsersOnEvents" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "regesteredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnEvents_pkey" PRIMARY KEY ("userId","eventId")
);

-- AddForeignKey
ALTER TABLE "EventsOnCategory" ADD CONSTRAINT "EventsOnCategory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsOnCategory" ADD CONSTRAINT "EventsOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnEvents" ADD CONSTRAINT "UsersOnEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnEvents" ADD CONSTRAINT "UsersOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
