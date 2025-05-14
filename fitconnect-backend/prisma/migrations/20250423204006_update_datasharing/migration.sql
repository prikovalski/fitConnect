/*
  Warnings:

  - A unique constraint covering the columns `[patientId,professionalId,role]` on the table `DataSharing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `professionalId` to the `DataSharing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `DataSharing` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DataSharing_patientId_key";

-- AlterTable
ALTER TABLE "DataSharing" ADD COLUMN     "professionalId" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DataSharing_patientId_professionalId_role_key" ON "DataSharing"("patientId", "professionalId", "role");

-- AddForeignKey
ALTER TABLE "DataSharing" ADD CONSTRAINT "DataSharing_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
