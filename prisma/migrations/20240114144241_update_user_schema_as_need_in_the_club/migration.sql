/*
  Warnings:

  - You are about to drop the column `forgotPasswordToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "forgotPasswordToken",
ADD COLUMN     "interests" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "memberId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "membershipFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "membershipType" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "membershipValidity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rollNo" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "session" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "fullname" DROP DEFAULT,
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "images" DROP DEFAULT;
