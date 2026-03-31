import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { RentType } from "@/types/entities/RentType";
import { ERentStatus } from "@prisma/client";
import { ServerError } from "@/utils/models/ServerError";
import { differenceInDays, isAfter } from "date-fns";

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

    // 1. Verificar se o aluguel existe e não está finalizado
    const existingRent = await this.rentalRepo.find(id);
    
    if (!existingRent) {
      throw new ServerError("Aluguel não encontrado ou já excluído.", 404);
    }

    if (existingRent.status === ERentStatus.FINISHED) {
      throw new ServerError("Este aluguel já foi finalizado anteriormente.", 400);
    }

    // 2. Lógica de cálculo de atraso (opcional, dependendo de como o sistema cobra taxas)
    const today = new Date();
    const plannedReturn = new Date(existingRent.return_date);
    
    if (isAfter(today, plannedReturn)) {
        const lateDays = differenceInDays(today, plannedReturn);
        // Aqui poderíamos calcular uma taxa de atraso se necessário
        console.log(`Aluguel com ${lateDays} dias de atraso.`);
    }

    // 3. Processar devolução no repositório
    const rent = await this.rentalRepo.returnRent(rentReturnData);

    return rent;
  }
}
