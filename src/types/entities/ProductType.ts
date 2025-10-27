import { products, Prisma } from "@prisma/client"

export type ProductType = products;
export type ProductInsertDtoType = Prisma.productsCreateArgs;
export type ProductUpdateDtoType = Prisma.productsUpdateArgs;
