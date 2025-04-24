import { EntityInsertDtoType, EntityType, EntityUpdateDtoType } from "../EntityType";

export type ProductType = EntityType<"products">;
export type ProductInsertDtoType = EntityInsertDtoType<"products">;
export type ProductUpdateDtoType = EntityUpdateDtoType<"products">;
