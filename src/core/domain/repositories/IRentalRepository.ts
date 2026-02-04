import { Prisma } from "@prisma/client";
import { Rental } from "../entities/Rental";
import { RentType } from "@/types/entities/RentType";

export interface IRentalRepository {
  findActiveByProduct(productId: string, excludeRentId?: string): Promise<Rental[]>;
  save(rental: Rental): Promise<void>;
  create(data: Prisma.rentsCreateInput): Promise<RentType>;
  update(id: string, data: Prisma.rentsUpdateInput): Promise<RentType>;
  deleteRentProducts(rentId: string): Promise<void>;
}
