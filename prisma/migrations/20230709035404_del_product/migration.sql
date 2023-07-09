/*
  Warnings:

  - You are about to drop the column `product_id` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_vendor_id_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "product_id",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "measure" "Measure" NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Product";

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
