/*
  Warnings:

  - The values [Kabupaten,Kota] on the enum `RegencyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RegencyType_new" AS ENUM ('KABUPATEN', 'KOTA');
ALTER TABLE "Regencies" ALTER COLUMN "type" TYPE "RegencyType_new" USING ("type"::text::"RegencyType_new");
ALTER TYPE "RegencyType" RENAME TO "RegencyType_old";
ALTER TYPE "RegencyType_new" RENAME TO "RegencyType";
DROP TYPE "public"."RegencyType_old";
COMMIT;
