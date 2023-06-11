-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "components" TEXT,
    "category" TEXT,
    "description" TEXT,
    "weight" INTEGER,
    "price" INTEGER,
    "image" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
