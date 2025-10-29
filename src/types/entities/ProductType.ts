import { products, Prisma } from "@prisma/client"
import { CategoryType } from "./CategoryType";

export type ProductType = products & {
    categories: CategoryType
};
export type ProductInsertDtoType = Prisma.productsCreateInput;
export type ProductUpdateDtoType = Prisma.productsUpdateInput;

export type ProductInsertWithCategoryDtoType = Omit<ProductInsertDtoType, "categories" | "rent_products"> & {
    category_id?: string;
}

export type ProductUpdateWithCategoryDtoType = Omit<ProductUpdateDtoType, "categories" | "rent_products"> & {
    category_id?: string;
}