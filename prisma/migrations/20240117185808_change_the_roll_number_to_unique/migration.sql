/*
  Warnings:

  - A unique constraint covering the columns `[rollNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "rollNo" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_rollNo_key" ON "User"("rollNo");