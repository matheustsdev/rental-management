import { BaseEntity } from "./baseEntity";
import { ProductType } from "./product";

export type CategoryType = BaseEntity & {
    name: string;
    products?: ProductType[];
}