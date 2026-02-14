import { Prisma } from "@prisma/client"
import { RentProductType } from "./RentProductType";

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
  rent_products: Prisma.rent_productsCreateManyRentInput[]
};

export type RentUpdateWithProductDtoType = RentUpdateDtoType & {
  rent_products: RentProductType[],
};
