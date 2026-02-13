/*
  Warnings:

  - You are about to drop the column `actual_return_buffer_days` on the `rent_products` table. All the data in the column will be lost.
  - You are about to drop the column `actual_return_date` on the `rent_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rent_products" DROP COLUMN "actual_return_buffer_days",
DROP COLUMN "actual_return_date",
ADD COLUMN     "real_return_buffer_days" INTEGER,
ADD COLUMN     "real_return_date" DATE;
