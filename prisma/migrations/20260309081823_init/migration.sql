-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "called" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);
