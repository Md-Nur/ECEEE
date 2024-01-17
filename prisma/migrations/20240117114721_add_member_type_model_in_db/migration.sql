-- AlterTable
ALTER TABLE "User" ALTER COLUMN "year" SET DEFAULT '',
ALTER COLUMN "year" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "MemberType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "MemberType_pkey" PRIMARY KEY ("id")
);
