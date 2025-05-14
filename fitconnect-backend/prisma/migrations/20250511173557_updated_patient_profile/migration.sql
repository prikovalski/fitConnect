/*
  Warnings:

  - You are about to drop the column `activityDescription` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `essentialFoods` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `foodAllergyOrIntolerance` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `foodsToAvoid` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `mealTimeConsistency` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PatientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `User` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `PatientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `PatientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `PatientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `PatientProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PatientProfile" DROP COLUMN "activityDescription",
DROP COLUMN "createdAt",
DROP COLUMN "essentialFoods",
DROP COLUMN "foodAllergyOrIntolerance",
DROP COLUMN "foodsToAvoid",
DROP COLUMN "mealTimeConsistency",
DROP COLUMN "updatedAt",
ADD COLUMN     "activityFrequency" TEXT,
ADD COLUMN     "avoidFood" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fixedMealTimes" TEXT,
ADD COLUMN     "foodAllergy" TEXT,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mustHaveFood" TEXT,
ADD COLUMN     "profileImageUrl" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "physicalActivity" DROP NOT NULL,
ALTER COLUMN "physicalActivity" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
DROP COLUMN "gender",
DROP COLUMN "peso";
