-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "entrance" DROP NOT NULL,
ALTER COLUMN "floor" DROP NOT NULL,
ALTER COLUMN "apartment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "comment" TEXT;
