import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentInsertWithProductDtoType, RentType } from "@/types/entities/RentType";
import { Prisma } from "@prisma/client";
import { ServerError } from "@/utils/models/ServerError";
import { isBefore, startOfDay } from "date-fns";

export class CreateRentUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: RentInsertWithProductDtoType): Promise<RentType> {
    const { rent_products, rent_date, return_date, discount_type, discount_value = 0, signal_value = 0 } = input;

    const startDate = new Date(rent_date);
    const endDate = new Date(return_date);
    const today = startOfDay(new Date());

    // 0. Validar datas
    if (isBefore(startDate, today)) {
      throw new ServerError("A data de aluguel não pode ser no passado.", 400);
    }

    if (isBefore(endDate, startDate) || endDate.getTime() === startDate.getTime()) {
      throw new ServerError("A data de devolução deve ser posterior à data de aluguel.", 400);
    }

    let subtotal = 0;

    // 1. Validar disponibilidade para cada produto e calcular subtotal
    for (const rentProduct of rent_products) {
      const product = await this.productRepo.findById(rentProduct.product_id);

      if (!product) {
        throw new ServerError(`Produto com ID ${rentProduct.product_id} não encontrado.`, 404);
      }

      const activeRentals = await this.rentalRepo.findActiveByProduct(rentProduct.product_id);
      
      const hasConflict = activeRentals.some(rental =>
        rental.conflictsWith(startDate, endDate, product.bufferDays)
      );

      if (hasConflict) {
        throw new ServerError(`Produto "${product.description}" indisponível entre as datas selecionadas (considerando período de limpeza).`);
      }

      subtotal += Number(rentProduct.product_price);
    }

    // 2. Calcular total com desconto
    let totalValue = subtotal;
    if (discount_type === "PERCENTAGE") {
      totalValue = subtotal * (1 - (Number(discount_value) / 100));
    } else if (discount_type === "FIXED") {
      totalValue = Math.max(0, subtotal - Number(discount_value));
    }

    const remainingValue = Math.max(0, totalValue - Number(signal_value));

    // 3. Construir o payload de inserção para o Prisma
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
      total_value: new Prisma.Decimal(totalValue),
      remaining_value: new Prisma.Decimal(remainingValue),
      rent_products: rentProductsInsertPayload,
    };

    // 4. Criar o aluguel no banco de dados
    const newRent = await this.rentalRepo.create(insertRentPayload);

    return newRent;
  }
}
