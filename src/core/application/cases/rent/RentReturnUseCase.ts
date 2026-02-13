import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { RentType } from "@/types/entities/RentType";

export type RentReturnDTO = {
  id: string;
  rentProducts: {
    id: string;
    realBuffer: number;
  }[]
}

export class RentReturnUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
  ) {}

  async execute(rentReturnData: RentReturnDTO): Promise<RentType | null> {
    const rent = await this.rentalRepo.returnRent(rentReturnData);

    return rent;
  }
}
