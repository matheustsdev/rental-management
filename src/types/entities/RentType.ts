import { RentProductInsertWithProductDtoType, RentProductUpdateWithProductDtoType } from "./RentProductType";
import { Prisma } from "@prisma/client"

export type RentType = Prisma.rentsGetPayload<{
  include: {
    rent_products: {
      include: {
        products: true
      }
    }
  }
}>;

export type RentInsertDtoType = Prisma.rentsCreateInput;
export type RentUpdateDtoType = Prisma.rentsUpdateInput;

export type RentInsertWithProductDtoType = RentInsertDtoType & {
  rent_products: RentProductInsertWithProductDtoType[]
};

export type RentUpdateWithProductDtoType = RentUpdateDtoType & {
  rent_products: RentProductUpdateWithProductDtoType[],
};
