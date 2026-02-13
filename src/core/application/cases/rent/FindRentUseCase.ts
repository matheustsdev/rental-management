import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { RentType } from "@/types/entities/RentType";

export class FindRentUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
  ) {}

  async execute(id: string): Promise<RentType | null> {
    const rent = await this.rentalRepo.find(id);

    return rent;
  }
}
