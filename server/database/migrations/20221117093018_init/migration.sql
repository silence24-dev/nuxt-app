/*
  Warnings:

  - You are about to drop the column `orderDetails` on the `Order` table. All the data in the column will be lost.
  - Changed the type of `orderItems` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderDetails",
DROP COLUMN "orderItems",
ADD COLUMN     "orderItems" JSONB NOT NULL;
