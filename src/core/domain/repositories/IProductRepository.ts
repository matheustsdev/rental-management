import { Prisma } from "@prisma/client";
import { Product } from "../entities/Product";
import { ProductType } from "@/types/entities/ProductType";

export type ProductListInput = {
  where?: Prisma.productsWhereInput;
  orderBy?: string;
  ascending?: boolean;
  page?: number;
  pageSize?: number;
};

export interface IProductRepository {
  create(data: Prisma.productsCreateInput): Promise<ProductType>;
  list(params: ProductListInput): Promise<ProductType[]>;
  update(id: string, data: Prisma.productsUpdateInput): Promise<ProductType>;
  findById(id: string): Promise<Product | null>;
  count(where?: Prisma.productsWhereInput): Promise<number>;
}