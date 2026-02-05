import { Prisma } from "@prisma/client";
import { Rental } from "../entities/Rental";
import { RentType } from "@/types/entities/RentType";

export type RentalListInput = {
  where?: Prisma.rentsWhereInput;
  orderBy?: string;
  ascending?: boolean;
  page?: number;
  pageSize?: number;
};

export interface IRentalRepository {
  findActiveByProduct(productId: string, excludeRentId?: string): Promise<Rental[]>;
  create(data: Prisma.rentsCreateInput): Promise<RentType>;
  update(id: string, data: Prisma.rentsUpdateInput): Promise<RentType>;
  deleteRentProducts(rentId: string): Promise<void>;
  count(where?: Prisma.rentsWhereInput): Promise<number>;
  list(params: RentalListInput): Promise<RentType[]>;
}
