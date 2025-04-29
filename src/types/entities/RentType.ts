import { EntityInsertDtoType, EntityType, EntityUpdateDtoType } from "../EntityType";

export type RentType = EntityType<"rents">;
export type RentInsertDtoType = EntityInsertDtoType<"rents">;
export type RentUpdateDtoType = EntityUpdateDtoType<"rents">;
export type RentInsertDtoWithProduct = RentInsertDtoType & {
  productIds: string[];
};
