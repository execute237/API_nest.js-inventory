/*
  Warnings:

  - A unique constraint covering the columns `[employee_id]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token_employee_id_key" ON "Token"("employee_id");
