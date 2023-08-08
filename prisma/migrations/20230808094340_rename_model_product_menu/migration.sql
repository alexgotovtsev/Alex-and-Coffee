/*
  Warnings:

  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `not_bonus_program` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `not_discounts` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Order_Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToOrder_Product` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `quantity` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_OrderToOrder_Product" DROP CONSTRAINT "_OrderToOrder_Product_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToOrder_Product" DROP CONSTRAINT "_OrderToOrder_Product_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currency",
DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "not_bonus_program",
DROP COLUMN "not_discounts",
ALTER COLUMN "quantity" SET NOT NULL;

-- DropTable
DROP TABLE "Order_Product";

-- DropTable
DROP TABLE "_OrderToOrder_Product";

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit_amount" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "currency" TEXT NOT NULL,
    "unit" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "quantity" DOUBLE PRECISION DEFAULT 0,
    "not_discounts" BOOLEAN,
    "not_bonus_program" BOOLEAN,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProduct_AB_unique" ON "_OrderToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProduct_B_index" ON "_OrderToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
