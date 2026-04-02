import { Prisma } from "@prisma/client";
import { CategoryType } from "@/types/entities/CategoryType";

export type CategoryListInput = {
  search?: string;
  orderBy?: string;
  ascending?: boolean;
  page?: number;
  pageSize?: number;
};

export interface ICategoryRepository {
  create(data: Prisma.categoriesCreateInput): Promise<CategoryType>;
  list(params?: CategoryListInput): Promise<CategoryType[]>;
  update(id: string, data: Prisma.categoriesUpdateInput): Promise<CategoryType>;
  findById(id: string): Promise<CategoryType | null>;
  findByName(name: string): Promise<CategoryType | null>;
  count(where?: Prisma.categoriesWhereInput): Promise<number>;
  delete(id: string): Promise<CategoryType>;
}
