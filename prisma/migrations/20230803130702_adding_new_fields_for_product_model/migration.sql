/*
  Warnings:

  - Added the required column `unit` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `unit_amount` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "not_bonus_program" BOOLEAN,
ADD COLUMN     "not_discounts" BOOLEAN,
ADD COLUMN     "unit" DOUBLE PRECISION NOT NULL,
DROP COLUMN "unit_amount",
ADD COLUMN     "unit_amount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
