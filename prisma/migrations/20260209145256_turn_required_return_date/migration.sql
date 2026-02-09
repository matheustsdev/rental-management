/*
  Warnings:

  - Made the column `return_date` on table `rents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rents" ALTER COLUMN "return_date" SET NOT NULL;
