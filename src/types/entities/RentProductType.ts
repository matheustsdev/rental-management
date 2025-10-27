import { ProductType } from "./ProductType";
import { rent_products, Prisma } from "@prisma/client"

export type RentProductType = rent_products & {
    products: ProductType | null;
};
export type RentProductInsertDtoType = Prisma.rent_productsCreateInput;

export type RentProductUpdateDtoType = Prisma.rent_productsUpdateInput;