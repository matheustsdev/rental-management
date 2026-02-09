import { Prisma } from "@prisma/client";
import { Product } from "../entities/Product";
import { ProductType } from "@/types/entities/ProductType";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";

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
  listWithAvailability(searchText: string, startDate: Date, endDate: Date): Promise<ProductAvailabilityType[]>;
  update(id: string, data: Prisma.productsUpdateInput): Promise<ProductType>;
  findById(id: string): Promise<Product | null>;
  count(where?: Prisma.productsWhereInput): Promise<number>;
}