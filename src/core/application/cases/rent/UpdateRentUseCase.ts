import { IRentalRepository as IRentRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentUpdateWithProductDtoType, RentType } from "@/types/entities/RentType";
import { ERentStatus, Prisma } from "@prisma/client";
import { ServerError } from "@/utils/models/ServerError";
import { isBefore } from "date-fns";

export class UpdateRentUseCase {
  constructor(
    private rentRepository: IRentRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: RentUpdateWithProductDtoType): Promise<RentType> {
    const { id, rent_products, rent_date, return_date, status, ...restOfInput } = input;

    if (!id || typeof id !== 'string') {
      throw new ServerError("É obrigatório informar o ID do aluguel para atualizar.", 400);
    }

    // 0. Verificar se o aluguel existe e não está deletado
    const existingRent = await this.rentRepository.find(id);
    if (!existingRent) {
      throw new ServerError("Aluguel não encontrado ou já excluído.", 404);
    }

    // 1. Validar transição de status
    if (status && status !== existingRent.status) {
        if (existingRent.status === ERentStatus.FINISHED) {
            throw new ServerError("Não é possível alterar um aluguel já finalizado.", 400);
        }
        if (existingRent.status === ERentStatus.IN_PROGRESS && status === ERentStatus.SCHEDULED) {
            throw new ServerError("Não é possível voltar um aluguel em andamento para agendado.", 400);
        }
    }

    // 2. Validar datas
    const startDate = rent_date ? new Date(rent_date as string) : new Date(existingRent.rent_date);
    const endDate = return_date ? new Date(return_date as string) : new Date(existingRent.return_date);

    if (isBefore(endDate, startDate) || endDate.getTime() === startDate.getTime()) {
        throw new ServerError("A data de devolução deve ser posterior à data de aluguel.", 400);
    }

    // 3. Validar disponibilidade para cada produto, excluindo o próprio aluguel da verificação
    if (rent_products) {
        for (const rentProduct of rent_products) {
            const product = await this.productRepo.findById(rentProduct.product_id as string);
            if (!product) {
                throw new ServerError(`Produto com ID ${rentProduct.product_id} não encontrado.`, 404);
            }

            const activeRentals = await this.rentRepository.findActiveByProduct(rentProduct.product_id as string, id);
            
            const hasConflict = activeRentals.some(rental =>
                rental.conflictsWith(startDate, endDate, product.bufferDays)
            );

            if (hasConflict) {
                throw new ServerError(`Produto "${product.description}" indisponível entre as datas selecionadas (considerando período de limpeza).`);
            }
        }
    } else if (rent_date || return_date) {
        // Se mudou apenas a data, validar disponibilidade dos produtos atuais
        for (const rentProduct of existingRent.rent_products) {
            const product = await this.productRepo.findById(rentProduct.product_id);
            if (!product) continue;

            const activeRentals = await this.rentRepository.findActiveByProduct(rentProduct.product_id, id);
            const hasConflict = activeRentals.some(rental =>
                rental.conflictsWith(startDate, endDate, product.bufferDays)
            );

            if (hasConflict) {
                throw new ServerError(`Produto "${product.description}" indisponível nas novas datas selecionadas.`);
            }
        }
    }

    // 4. Calcular novos valores financeiros
    let subtotal = 0;
    const finalProducts = rent_products || existingRent.rent_products;
    
    for (const rp of finalProducts) {
      subtotal += Number(rp.product_price);
    }

    const discountType = (input.discount_type !== undefined ? input.discount_type : existingRent.discount_type) as string;
    const discountValue = Number(input.discount_value !== undefined ? input.discount_value : existingRent.discount_value);
    const signalValue = Number(input.signal_value !== undefined ? input.signal_value : existingRent.signal_value);

    let totalValue = subtotal;
    if (discountType === "PERCENTAGE") {
      totalValue = subtotal * (1 - (discountValue / 100));
    } else if (discountType === "FIXED") {
      totalValue = Math.max(0, subtotal - discountValue);
    }

    const remainingValue = Math.max(0, totalValue - signalValue);

    // 5. Construir o payload de atualização
    const updateRentPayload: Prisma.rentsUpdateInput = {
      ...restOfInput,
      total_value: new Prisma.Decimal(totalValue),
      remaining_value: new Prisma.Decimal(remainingValue),
      ...(rent_date && { rent_date }),
      ...(return_date && { return_date }),
      ...(status && { status }),
    };

    // 6. Atualizar produtos se necessário
    if (rent_products) {
      await this.rentRepository.deleteRentProducts(id);

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
      updateRentPayload.rent_products = rentProductsInsertPayload;
    }
    
    const updatedRent = await this.rentRepository.update(id, updateRentPayload);

    return {
      ...updatedRent,
      remaining_balance: Number(updatedRent.remaining_value)
    };
  }
}
