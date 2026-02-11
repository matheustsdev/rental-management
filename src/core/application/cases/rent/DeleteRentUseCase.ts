import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";

export class DeleteRentUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.rentalRepo.delete(id);
  }
}
