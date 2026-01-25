/*
  Warnings:

  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Regency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Village` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_regencyId_fkey";

-- DropForeignKey
ALTER TABLE "Regency" DROP CONSTRAINT "Regency_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Village" DROP CONSTRAINT "Village_districtId_fkey";

-- DropTable
DROP TABLE "District";

-- DropTable
DROP TABLE "Province";

-- DropTable
DROP TABLE "Regency";

-- DropTable
DROP TABLE "Village";

-- CreateTable
CREATE TABLE "Provinces" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regencies" (
    "id" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RegencyType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Regencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Districts" (
    "id" TEXT NOT NULL,
    "regencyId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Villages" (
    "id" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Villages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provinces_code_key" ON "Provinces"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Regencies_code_key" ON "Regencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Districts_code_key" ON "Districts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Villages_code_key" ON "Villages"("code");

-- AddForeignKey
ALTER TABLE "Regencies" ADD CONSTRAINT "Regencies_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Districts" ADD CONSTRAINT "Districts_regencyId_fkey" FOREIGN KEY ("regencyId") REFERENCES "Regencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Villages" ADD CONSTRAINT "Villages_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "Districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
