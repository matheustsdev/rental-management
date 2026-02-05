import { IRentalRepository, RentalListInput } from "@/core/domain/repositories/IRentalRepository";
import { RentType } from "@/types/entities/RentType";

export type ListRentalUseCaseInputType = RentalListInput;

export class ListRentalUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
  ) {}

  async execute(input: ListRentalUseCaseInputType): Promise<{ data: RentType[]; count: number }> {
    const count = await this.rentalRepo.count(input.where);
    const data = await this.rentalRepo.list(input);

    return { data, count };
  }
}
