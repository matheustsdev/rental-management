import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { ServerError } from "@/utils/models/ServerError";

export class DeleteRentUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingRent = await this.rentalRepo.find(id);
    
    if (!existingRent) {
      throw new ServerError("Aluguel não encontrado ou já excluído.", 404);
    }

    await this.rentalRepo.delete(id);
  }
}
