import { ERentStatus, Prisma } from "@prisma/client";
import { RentEntity } from "../entities/RentEntity";
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
  findActiveByProduct(productId: string, excludeRentId?: string): Promise<RentEntity[]>;
  create(data: RentEntity): Promise<RentEntity>;
  update(id: string, data: RentEntity): Promise<RentEntity>;
  deleteRentProducts(rentId: string): Promise<void>;
  count(where?: Prisma.rentsWhereInput): Promise<number>;
  list(params: RentalListInput): Promise<RentEntity[]>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<RentEntity | null>;
  returnRent(rentReturn: RentReturnDTO): Promise<RentEntity>;
  findOverlappingRents(productId: string, startDate: Date, endDate: Date): Promise<RentEntity[]>;
}
