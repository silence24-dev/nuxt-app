/*
  Warnings:

  - Added the required column `payment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderDetails" TEXT,
ADD COLUMN     "payment" TEXT NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;
