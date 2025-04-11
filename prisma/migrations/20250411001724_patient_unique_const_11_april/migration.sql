/*
  Warnings:

  - A unique constraint covering the columns `[email,phone]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Patient_email_key";

-- DropIndex
DROP INDEX "Patient_phone_key";

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_phone_key" ON "Patient"("email", "phone");
