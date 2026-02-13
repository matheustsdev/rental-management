import { IRentalRepository as IRentRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentUpdateWithProductDtoType, RentType } from "@/types/entities/RentType";
import { Prisma } from "@prisma/client";
import { ServerError } from "@/utils/models/ServerError";

export class UpdateRentUseCase {
  constructor(
    private rentRepository: IRentRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: RentUpdateWithProductDtoType): Promise<RentType> {
    const { id, rent_products, rent_date, return_date, ...restOfInput } = input;

    if (!id || typeof id !== 'string') {
      throw new ServerError("É obrigatório informar o ID do aluguel para atualizar.", 400);
    }

    // 1. Validar disponibilidade para cada produto, excluindo o próprio aluguel da verificação
    if (rent_products && rent_date && return_date) {
        for (const rentProduct of rent_products) {
            const product = await this.productRepo.findById(rentProduct.product_id as string);
            if (!product) {
                throw new ServerError(`Produto com ID ${rentProduct.product_id} não encontrado.`, 404);
            }

            // Busca aluguéis ativos para o produto, excluindo o que está sendo editado
            const activeRentals = await this.rentRepository.findActiveByProduct(rentProduct.product_id as string, id);
            
            const hasConflict = activeRentals.some(rental =>
                rental.conflictsWith(new Date(rent_date as string), new Date(return_date as string), product.bufferDays)
            );

            if (hasConflict) {
                throw new ServerError(`Produto "${product.description}" indisponível entre as datas selecionadas (considerando período de limpeza).`);
            }
        }
    }

    // 2. Construir o payload de atualização para o Prisma, lidando com atualizações parciais
    const updateRentPayload: Prisma.rentsUpdateInput = {
      ...restOfInput,
      ...(rent_date && { rent_date }),
      ...(return_date && { return_date }),
    };

    // 3. Se os produtos do aluguel estão sendo atualizados, deleta (soft delete) os antigos e cria os novos.
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
    
    // 4. Atualizar o aluguel no banco de dados
    const updatedRent = await this.rentRepository.update(id, updateRentPayload);

    return updatedRent;
  }
}
