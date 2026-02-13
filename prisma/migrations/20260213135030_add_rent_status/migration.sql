-- CreateEnum
CREATE TYPE "ERentStatus" AS ENUM ('FINISHED', 'SCHEDULED', 'IN_PROGRESS');

-- CreateEnum
CREATE TYPE "EAvailabilityStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'BUFFER_OCCUPIED');

-- CreateEnum
CREATE TYPE "EDiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateEnum
CREATE TYPE "EMeasuresType" AS ENUM ('SUIT', 'DRESS');

-- AlterTable
ALTER TABLE "rents" ADD COLUMN     "status" "ERentStatus" NOT NULL DEFAULT 'SCHEDULED';
