import { Rental } from "../entities/Rental";

export interface IRentalRepository {
  findActiveByProduct(productId: string): Promise<Rental[]>;
  save(rental: Rental): Promise<void>;
}
