/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telegram` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `viber` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
DROP COLUMN "role",
DROP COLUMN "telegram",
DROP COLUMN "viber";

-- DropEnum
DROP TYPE "UserRole";
