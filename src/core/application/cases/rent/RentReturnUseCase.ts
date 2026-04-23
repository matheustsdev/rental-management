import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { RentType } from "@/types/entities/RentType";
import { ERentStatus } from "@prisma/client";
import { ServerError } from "@/utils/models/ServerError";
import { RentMapper } from "../../mappers/RentMapper";

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
    const { id } = rentReturnData;

    const existingRent = await this.rentalRepo.find(id);
    
    if (!existingRent) {
      throw new ServerError("Aluguel não encontrado ou já excluído.", 404);
    }

    if (existingRent.status === ERentStatus.FINISHED) {
      throw new ServerError("Este aluguel já foi finalizado anteriormente.", 400);
    }

    if (existingRent.isLate()) {
        const lateDays = existingRent.getLateDays();
        console.log(`Aluguel com ${lateDays} dias de atraso.`);
    }

    const savedRent = await this.rentalRepo.returnRent(rentReturnData);

    return RentMapper.toDto(savedRent);
  }
}
