import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentUpdateWithProductDtoType, RentType } from "@/types/entities/RentType";
import { ERentStatus, discount_type_enum as DiscountType } from "@prisma/client";
import { ServerError } from "@/utils/models/ServerError";
import { Rent } from "@/core/domain/entities/Rent";
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { v4 as uuidv4 } from "uuid";
import { RentMapper } from "../../mappers/RentMapper";

export class UpdateRentUseCase {
  constructor(
    private rentRepository: IRentalRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: RentUpdateWithProductDtoType): Promise<RentType> {
    const { id, rent_products, rent_date, return_date, status, ...restOfInput } = input;

    if (!id || typeof id !== 'string') {
      throw new ServerError("É obrigatório informar o ID do aluguel para atualizar.", 400);
    }

    // 0. Verificar se o aluguel existe
    const existingRent = await this.rentRepository.find(id);
    if (!existingRent) {
      throw new ServerError("Aluguel não encontrado ou já excluído.", 404);
    }

    // 1. Validar datas e disponibilidade
    const startDate = rent_date ? new Date(rent_date as string) : existingRent.rentDate;
    const endDate = return_date ? new Date(return_date as string) : existingRent.returnDate;

    // Normalizar lista de IDs de produtos para validar disponibilidade
    const productIdsToValidate = rent_products 
      ? rent_products.map(rp => rp.product_id)
      : existingRent.items.map(item => item.productId);

    for (const productId of productIdsToValidate) {
      const product = await this.productRepo.findById(productId);
      if (!product) {
        throw new ServerError(`Produto com ID ${productId} não encontrado.`, 404);
      }

      const activeRentals = await this.rentRepository.findActiveByProduct(productId, id);
      
      const hasConflict = activeRentals.some(r =>
        r.conflictsWith(startDate, endDate, product.bufferDays)
      );

      if (hasConflict) {
        throw new ServerError(`Produto "${product.description}" indisponível entre as datas selecionadas.`);
      }
    }

    // 2. Preparar novos itens se fornecidos
    let domainItems = existingRent.items;
    if (rent_products) {
      const itemsWithProduct: RentProduct[] = [];
      for (const rp of rent_products) {
        const product = await this.productRepo.findById(rp.product_id);
        itemsWithProduct.push(new RentProduct({
          id: uuidv4(),
          productId: rp.product_id,
          productPrice: Number(rp.product_price),
          productDescription: rp.product_description,
          measureType: rp.measure_type,
          bust: rp.bust ? Number(rp.bust) : null,
          waist: rp.waist ? Number(rp.waist) : null,
          hip: rp.hip ? Number(rp.hip) : null,
          shoulder: rp.shoulder ? Number(rp.shoulder) : null,
          sleeve: rp.sleeve ? Number(rp.sleeve) : null,
          height: rp.height ? Number(rp.height) : null,
          back: rp.back ? Number(rp.back) : null,
          product: product ? {
            reference: product.reference,
            categories: product.categoryName ? {
              name: product.categoryName
            } : null
          } : null
        }));
      }
      domainItems = itemsWithProduct;
    }

    // 3. Atualizar a entidade Rent
    const updatedRentEntity = new Rent({
      id: existingRent.id,
      code: existingRent.code,
      status: existingRent.status, // Começa com o atual para validar transição
      rentDate: existingRent.rentDate,
      returnDate: existingRent.returnDate,
      clientName: restOfInput.client_name ? restOfInput.client_name.toString() : existingRent.clientName,
      address: restOfInput.address !== undefined ? (restOfInput.address as string | null) : existingRent.address,
      phone: restOfInput.phone !== undefined ? (restOfInput.phone as string | null) : existingRent.phone,
      discountType: restOfInput.discount_type !== undefined ? (restOfInput.discount_type as DiscountType | null) : existingRent.discountType,
      discountValue: restOfInput.discount_value !== undefined ? Number(restOfInput.discount_value) : existingRent.discountValue,
      signalValue: restOfInput.signal_value !== undefined ? Number(restOfInput.signal_value) : existingRent.signalValue,
      internalObservations: restOfInput.internal_observations !== undefined ? (restOfInput.internal_observations as string | null) : existingRent.internalObservations,
      receiptObservations: restOfInput.receipt_observations !== undefined ? (restOfInput.receipt_observations as string | null) : existingRent.receiptObservations,
      items: domainItems,
      createdAt: existingRent.createdAt,
      realReturnDate: restOfInput.real_return_date !== undefined ? (restOfInput.real_return_date as Date | null) : existingRent.realReturnDate
    });

    // Aplicar mudanças que exigem validação
    if (rent_date || return_date) {
      updatedRentEntity.updateDates(startDate, endDate);
    }

    if (status && status !== existingRent.status) {
      updatedRentEntity.updateStatus(status as ERentStatus);
    }

    // 4. Persistir
    if (rent_products) {
      await this.rentRepository.deleteRentProducts(id);
    }

    const savedRent = await this.rentRepository.update(id, updatedRentEntity);

    return RentMapper.toDto(savedRent);
  }
}
