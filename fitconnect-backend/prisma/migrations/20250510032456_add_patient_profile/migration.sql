-- CreateTable
CREATE TABLE "PatientProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "chronicDisease" TEXT,
    "medicalRestriction" TEXT,
    "foodAllergyOrIntolerance" TEXT,
    "foodsToAvoid" TEXT,
    "physicalActivity" BOOLEAN NOT NULL,
    "activityDescription" TEXT,
    "mealTimeConsistency" BOOLEAN NOT NULL,
    "essentialFoods" TEXT,
    "neckCircumference" DOUBLE PRECISION,
    "waistCircumference" DOUBLE PRECISION,
    "hipCircumference" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientProfile_userId_key" ON "PatientProfile"("userId");

-- AddForeignKey
ALTER TABLE "PatientProfile" ADD CONSTRAINT "PatientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
