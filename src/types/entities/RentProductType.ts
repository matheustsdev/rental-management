import { EntityInsertDtoType, EntityType, EntityUpdateDtoType } from "../EntityType";
import { ProductType } from "./ProductType";
import { RentProductMeasuresTypes, RentProductMeasuresUpdateDtoType } from "./RentProductMeasuresTypes";

export type RentProductType = EntityType<"rent_products"> & {
    products: ProductType;
    product_measures: RentProductMeasuresTypes
};
export type RentProductInsertDtoType = EntityInsertDtoType<"rent_products">;

export type RentProductUpdateDtoType = EntityUpdateDtoType<"rent_products"> & {
    product_measures: RentProductMeasuresUpdateDtoType
};
