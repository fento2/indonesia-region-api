/*
  Warnings:

  - Added the required column `postalCode` to the `Villages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Villages" ADD COLUMN     "postalCode" TEXT NOT NULL;
