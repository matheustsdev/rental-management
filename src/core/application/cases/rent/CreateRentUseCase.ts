import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentInsertWithProductDtoType, RentType } from "@/types/entities/RentType";
import { Prisma } from "@prisma/client";
import { ServerError } from "@/models/ServerError";

export class CreateRentUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: RentInsertWithProductDtoType): Promise<RentType> {
    const { rent_products, rent_date, return_date } = input;

    // 1. Validar disponibilidade para cada produto
    for (const rentProduct of rent_products) {
      const product = await this.productRepo.findById(rentProduct.product_id);

      if (!product) {
        throw new ServerError(`Produto com ID ${rentProduct.product_id} não encontrado.`, 404);
      }

      const activeRentals = await this.rentalRepo.findActiveByProduct(rentProduct.product_id);
      
      const hasConflict = activeRentals.some(rental =>
        rental.conflictsWith(new Date(rent_date), new Date(return_date!), product.bufferDays)
      );

      console.log("Conflixct >> ", hasConflict);

      if (hasConflict) {
        throw new ServerError(`Produto "${product.description}" indisponível entre as datas selecionadas (considerando período de limpeza).`);
      }
    }

    // 2. Construir o payload de inserção para o Prisma
    const rentProductsInsertPayload: Prisma.rent_productsCreateNestedManyWithoutRentInput = {
      createMany: {
        data: rent_products.map((rp) => ({
          product_id: rp.product_id,
          product_price: rp.product_price,
          product_description: rp.product_description,
          measure_type: rp.measure_type,
        })),
      },
    };

    const insertRentPayload: Prisma.rentsCreateInput = {
      ...input,
      rent_products: rentProductsInsertPayload,
    };

    // 3. Criar o aluguel no banco de dados
    const newRent = await this.rentalRepo.create(insertRentPayload);

    return newRent;
  }
}
