import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentUpdateWithProductDtoType, RentType } from "@/types/entities/RentType";
import { Prisma } from "@prisma/client";
import { ServerError } from "@/models/ServerError";

export class UpdateRentalUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: RentUpdateWithProductDtoType): Promise<RentType> {
    const {  rent_products, rent_date, return_date, id } = input;

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
            const activeRentals = await this.rentalRepo.findActiveByProduct(rentProduct.product_id as string, id);
            
            const hasConflict = activeRentals.some(rental =>
                rental.conflictsWith(new Date(rent_date as string), new Date(return_date as string), product.bufferDays)
            );

            if (hasConflict) {
                throw new ServerError(`Produto "${product.description}" indisponível entre as datas selecionadas (considerando período de limpeza).`);
            }
        }
    }

    // 2. O Prisma não aceita um nested update para `createMany`, `updateMany`, `deleteMany` em uma transação de update.
    // A abordagem correta é deletar os antigos e criar os novos.
    await this.rentalRepo.deleteRentProducts(id);

    const rentProductsInsertPayload: Prisma.rent_productsCreateNestedManyWithoutRentsInput = {
      createMany: {
        data: rent_products.map((rp) => ({
          product_id: rp.product_id,
          product_price: rp.product_price,
          product_description: rp.product_description,
          measure_type: rp.measure_type,
        })),
      },
    };
    
    // 3. Construir o payload de atualização para o Prisma
    const updateRentPayload: Prisma.rentsUpdateInput = {
      ...input,
      id: undefined, // ID não pode estar no payload de dados
      rent_products: rentProductsInsertPayload,
    };

    // 4. Atualizar o aluguel no banco de dados
    const updatedRent = await this.rentalRepo.update(id, updateRentPayload);

    return updatedRent;
  }
}
