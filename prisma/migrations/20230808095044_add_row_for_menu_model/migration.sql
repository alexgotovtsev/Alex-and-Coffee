/*
  Warnings:

  - You are about to drop the column `quantity` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "quantity" DROP NOT NULL;
