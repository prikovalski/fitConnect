/*
  Warnings:

  - You are about to drop the column `birthDate` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `PatientProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PatientProfile" DROP COLUMN "birthDate",
DROP COLUMN "gender";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "peso" DOUBLE PRECISION;
