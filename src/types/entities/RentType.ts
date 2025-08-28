import { EntityInsertDtoType, EntityType, EntityUpdateDtoType } from "../EntityType";
import { RentProductInsertDtoType, RentProductType, RentProductUpdateDtoType } from "./RentProductType";

export type RentType = EntityType<"rents"> & {
  rent_products: RentProductType[],
  
}
export type RentInsertDtoType = EntityInsertDtoType<"rents">;
export type RentUpdateDtoType = EntityUpdateDtoType<"rents">;

export type RentInsertDtoWithProduct = RentInsertDtoType & {
  rent_products: RentProductInsertDtoType[]
};

export type RentUpdateDtoWithProduct = RentUpdateDtoType & {
  rent_products: RentProductUpdateDtoType[],
};
