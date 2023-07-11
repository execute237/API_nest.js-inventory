/*
  Warnings:

  - You are about to drop the column `inventory_name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_date` on the `Order` table. All the data in the column will be lost.
  - Added the required column `inventory_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_inventory_name_fkey";

-- DropIndex
DROP INDEX "Inventory_name_key";

-- DropIndex
DROP INDEX "Order_inventory_name_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "inventory_name",
DROP COLUMN "shipping_date",
ADD COLUMN     "inventory_id" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
