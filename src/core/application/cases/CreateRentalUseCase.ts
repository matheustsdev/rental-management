// src/core/application/use-cases/CreateRentalUseCase.ts
import { v4 as uuid } from 'uuid';
import { Rental } from "../../domain/entities/Rental";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository"; // Assumindo que existe

type Input = {
  productId: string;
  startDate: Date;
  endDate: Date;
  clientName: string;
};

export class CreateRentalUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: Input): Promise<Rental> {
    // 1. Buscar o produto para saber os dias de buffer (limpeza)
    const product = await this.productRepo.findById(input.productId);
    if (!product) throw new Error("Produto não encontrado");

    // 2. Buscar aluguéis já existentes desse produto
    const activeRentals = await this.rentalRepo.findActiveByProduct(input.productId);

    // 3. Validar disponibilidade (Usando a lógica da Entidade de Domínio)
    const hasConflict = activeRentals.some(rental => 
      rental.conflictsWith(input.startDate, input.endDate, product.bufferDays)
    );

    if (hasConflict) {
      throw new Error("Produto indisponível nestas datas (incluindo período de limpeza).");
    }

    // 4. Criar a nova entidade de aluguel
    const newRental = new Rental(
      uuid(),
      input.productId,
      input.startDate,
      input.endDate,
      'ACTIVE'
    );

    // 5. Salvar no banco (Infraestrutura)
    await this.rentalRepo.save(newRental);

    return newRental;
  }
}
