import { PrismaClient } from "@prisma/client";
import { PrismaRentalRepository } from "./database/PrismaRentalRepository";
import { PrismaProductRepository } from "./database/PrismaProductRepository";
import { PrismaCategoryRepository } from "./database/PrismaCategoryRepository";

export const prisma = new PrismaClient()

// Repositories
export const rentalRepository = new PrismaRentalRepository(prisma);
export const productRepository = new PrismaProductRepository(prisma);
export const categoryRepository = new PrismaCategoryRepository(prisma);

