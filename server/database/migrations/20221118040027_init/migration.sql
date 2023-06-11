-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "entrance" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "apartment" INTEGER NOT NULL,
    "doorphone" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
