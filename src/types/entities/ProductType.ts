import { products, Prisma } from "@prisma/client"
import { CategoryType } from "./CategoryType";

export type ProductType = products & {
    categories: CategoryType
};
export type ProductInsertDtoType = Prisma.productsCreateInput;
export type ProductUpdateDtoType = Prisma.productsUpdateInput;
