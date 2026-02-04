import { ProductType } from "./ProductType";
import { rent_products, Prisma } from "@prisma/client"

export type RentProductType = rent_products & {
    products: ProductType | null;
};
export type RentProductInsertDtoType = Prisma.rent_productsCreateInput;
export type RentProductUpdateDtoType = Prisma.rent_productsCreateInput;

export type RentProductInsertWithProductDtoType = Omit<RentProductInsertDtoType, "products" | "rents"> & {
    product_id: string;
}

// Using RentProductInsertDtoType because the update is a delete of rent_products and readd 
export type RentProductUpdateWithProductDtoType = Omit<RentProductInsertDtoType, "products" | "rents"> & {
    product_id: string;
}