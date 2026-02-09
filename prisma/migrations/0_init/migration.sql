-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."availability_status" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'BUFFER_OCCUPIED');

-- CreateEnum
CREATE TYPE "public"."discount_type_enum" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateEnum
CREATE TYPE "public"."measures_type" AS ENUM ('SUIT', 'DRESS');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "deleted" BOOLEAN DEFAULT false,
    "deleted_at" TIMESTAMPTZ(6),
    "post_return_buffer_days" INTEGER DEFAULT 0,
    "measure_type" "public"."measures_type",

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "reference" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "receipt_description" TEXT,
    "category_id" UUID,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "deleted" BOOLEAN DEFAULT false,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rent_products" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "rent_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "product_price" DECIMAL(10,2) NOT NULL,
    "product_description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "actual_return_buffer_days" INTEGER,
    "actual_return_date" DATE,
    "bust" DECIMAL,
    "waist" DECIMAL,
    "hip" DECIMAL,
    "shoulder" DECIMAL,
    "sleeve" DECIMAL,
    "height" DECIMAL,
    "back" DECIMAL,
    "measure_type" "public"."measures_type" NOT NULL,
    "deleted" BOOLEAN DEFAULT false,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "rent_products_pkey" PRIMARY KEY ("id")
);

-- CreateSequence
CREATE SEQUENCE IF NOT EXISTS "rents_code_seq";

-- CreateTable
CREATE TABLE "public"."rents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "rent_date" DATE NOT NULL,
    "return_date" DATE,
    "client_name" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "phone" VARCHAR(20),
    "total_value" DECIMAL(10,2) NOT NULL,
    "discount_type" "public"."discount_type_enum",
    "discount_value" DECIMAL(10,2) DEFAULT 0,
    "signal_value" DECIMAL(10,2) DEFAULT 0,
    "remaining_value" DECIMAL(10,2),
    "deleted" BOOLEAN DEFAULT false,
    "deleted_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "internal_observations" TEXT,
    "receipt_observations" TEXT,
    "code" DECIMAL NOT NULL DEFAULT nextval('rents_code_seq'::regclass),

    CONSTRAINT "rents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_rent_products_product_id" ON "public"."rent_products"("product_id" ASC);

-- CreateIndex
CREATE INDEX "idx_rent_products_rent_id" ON "public"."rent_products"("rent_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "rent_products_rent_id_product_id_key" ON "public"."rent_products"("rent_id" ASC, "product_id" ASC);

-- CreateIndex
CREATE INDEX "idx_rents_client_name" ON "public"."rents"("client_name" ASC);

-- CreateIndex
CREATE INDEX "idx_rents_rent_date" ON "public"."rents"("rent_date" ASC);

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."rent_products" ADD CONSTRAINT "rent_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."rent_products" ADD CONSTRAINT "rent_products_rent_id_fkey" FOREIGN KEY ("rent_id") REFERENCES "public"."rents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
