import { EMeasureType } from "@/constants/EMeasureType";
import { EntityInsertDtoType, EntityType, EntityUpdateDtoType } from "../EntityType";
import { RentProductType } from "./RentProductType";

export type RentType = EntityType<"rents"> & {
  rent_products: RentProductType[],
  
}
export type RentInsertDtoType = EntityInsertDtoType<"rents">;
export type RentUpdateDtoType = EntityUpdateDtoType<"rents">;
export type ProductWithMeasureRentDtoType = {
    id: string,
    measure_type: keyof typeof EMeasureType,
    waist?: number,
    bust?: number,
    hip?: number,
    shoulder?: number,
    sleeve?: number,
    height?: number,
    back?: number,
};

export type RentInsertDtoWithProduct = RentInsertDtoType & {
  products: ProductWithMeasureRentDtoType[]
};
