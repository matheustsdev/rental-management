import { ERentStatus, Prisma } from "@prisma/client";
import { Rent } from "../entities/Rent";
import { RentReturnDTO } from "@/core/application/cases/rent/RentReturnUseCase";

export type RentalListInput = {
  search?: string;
  status?: ERentStatus;
  startDate?: Date;
  endDate?: Date;
  orderBy?: string;
  ascending?: boolean;
  page?: number;
  pageSize?: number;
};

export interface IRentalRepository {
  findActiveByProduct(productId: string, excludeRentId?: string): Promise<Rent[]>;
  create(data: Rent): Promise<Rent>;
  update(id: string, data: Rent): Promise<Rent>;
  deleteRentProducts(rentId: string): Promise<void>;
  count(where?: Prisma.rentsWhereInput): Promise<number>;
  list(params: RentalListInput): Promise<Rent[]>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<Rent | null>;
  returnRent(rentReturn: RentReturnDTO): Promise<Rent>;
  findOverlappingRents(productId: string, startDate: Date, endDate: Date): Promise<Rent[]>;
}
