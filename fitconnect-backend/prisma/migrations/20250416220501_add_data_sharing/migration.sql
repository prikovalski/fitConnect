-- CreateTable
CREATE TABLE "DataSharing" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "shareWorkoutWith" BOOLEAN NOT NULL DEFAULT false,
    "shareMealWith" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DataSharing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataSharing_patientId_key" ON "DataSharing"("patientId");

-- AddForeignKey
ALTER TABLE "DataSharing" ADD CONSTRAINT "DataSharing_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
