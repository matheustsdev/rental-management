import { RentProductUpdateDtoType } from "./RentProductType";
import { rents, Prisma } from "@prisma/client"

export type RentType = rents;
export type RentInsertDtoType = Prisma.rentsCreateInput;
export type RentUpdateDtoType = Prisma.rentsUpdateInput;

export type RentInsertDtoWithProduct = RentInsertDtoType;

export type RentUpdateDtoWithProduct = RentUpdateDtoType & {
  rent_products: RentProductUpdateDtoType[],
};
