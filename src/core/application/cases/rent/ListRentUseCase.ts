import { IRentalRepository, RentalListInput as RentListInput } from "@/core/domain/repositories/IRentalRepository";
import { RentType } from "@/types/entities/RentType";

export type ListRentUseCaseInputType = RentListInput;

export class ListRentUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
  ) {}

  async execute(input: ListRentUseCaseInputType): Promise<{ data: RentType[]; count: number }> {
    const count = await this.rentalRepo.count(input.where);
    const data = await this.rentalRepo.list(input);

    return { data, count };
  }
}
