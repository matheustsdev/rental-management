import { RentProductInsertWithProductDtoType, RentProductUpdateWithProductDtoType } from "./RentProductType";
import { rents, Prisma } from "@prisma/client"

export type RentType = rents;
export type RentInsertDtoType = Prisma.rentsCreateInput;
export type RentUpdateDtoType = Prisma.rentsUpdateInput;

export type RentInsertWithProductDtoType = RentInsertDtoType & {
  rent_products: RentProductInsertWithProductDtoType[]
};

export type RentUpdateWithProductDtoType = RentUpdateDtoType & {
  rent_products: RentProductUpdateWithProductDtoType[],
};
