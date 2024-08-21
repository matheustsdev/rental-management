import { BaseEntity } from "./baseEntity";
import { CategoryType } from "./category";

export type ProductType = BaseEntity & {
    reference: string;
    price: number;
    description: string;
    receiptDescription: string;
    categoryId: string;
    category?: CategoryType;
}