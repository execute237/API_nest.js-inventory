-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
