/*
  Warnings:

  - Added the required column `type` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
