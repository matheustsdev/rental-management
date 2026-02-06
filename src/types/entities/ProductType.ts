import { Prisma } from "@prisma/client"

export type ProductType = Prisma.productsGetPayload<{
    include: {
        categories: true
    }
}>;

export type ProductInsertDtoType = Prisma.productsCreateInput;
export type ProductUpdateDtoType = Prisma.productsUpdateInput;

export type ProductInsertWithCategoryDtoType = Omit<ProductInsertDtoType, "categories" | "rent_products"> & {
    category_id?: string;
}

export type ProductUpdateWithCategoryDtoType = Omit<ProductUpdateDtoType, "categories" | "rent_products"> & {
    category_id?: string;
}