/*
  Warnings:

  - You are about to alter the column `capacity` on the `Events` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "capacity" SET DATA TYPE INTEGER;
