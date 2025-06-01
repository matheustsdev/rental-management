import { EMeasureType } from "@/constants/EMeasureType";
import { EntityInsertDtoType, EntityType, EntityUpdateDtoType } from "../EntityType";

export type RentType = EntityType<"rents">;
export type RentInsertDtoType = EntityInsertDtoType<"rents">;
export type RentUpdateDtoType = EntityUpdateDtoType<"rents">;
export type RentInsertDtoWithProduct = RentInsertDtoType & {
  products: {
    id: string,
    measure_type: keyof typeof EMeasureType,
    waist: number,
    bust?: number,
    hip?: number,
    shoulder?: number,
    sleeve?: number,
    height?: number,
    back?: number,
  }[];
};
