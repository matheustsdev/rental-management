import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentUpdateWithProductDtoType, RentType } from "@/types/entities/RentType";
import { ERentStatus, discount_type_enum as DiscountType, Prisma } from "@prisma/client";
import { ServerError } from "@/utils/models/ServerError";
import { RentEntity } from "@/core/domain/entities/RentEntity";
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
          internalObservations: rp.internal_observations ?? null,
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
    const currentDto = RentMapper.toDto(existingRent);
    const updatedRentEntity = new RentEntity({
      ...currentDto,
      client_name: restOfInput.client_name ? restOfInput.client_name.toString() : currentDto.client_name,
      address: restOfInput.address !== undefined ? (restOfInput.address as string | null) : currentDto.address,
      phone: restOfInput.phone !== undefined ? (restOfInput.phone as string | null) : currentDto.phone,
      discount_type: restOfInput.discount_type !== undefined ? (restOfInput.discount_type as DiscountType | null) : currentDto.discount_type,
      discount_value: restOfInput.discount_value !== undefined ? new Prisma.Decimal(restOfInput.discount_value as number) : currentDto.discount_value,
      signal_value: restOfInput.signal_value !== undefined ? new Prisma.Decimal(restOfInput.signal_value as number) : currentDto.signal_value,
      internal_observations: restOfInput.internal_observations !== undefined ? (restOfInput.internal_observations as string | null) : currentDto.internal_observations,
      receipt_observations: restOfInput.receipt_observations !== undefined ? (restOfInput.receipt_observations as string | null) : currentDto.receipt_observations,
      rent_products: domainItems.map(item => {
        const itemJson = item.toJSON();
        return {
          id: itemJson.id,
          rent_id: id,
          product_id: itemJson.productId,
          product_price: new Prisma.Decimal(itemJson.productPrice),
          product_description: itemJson.productDescription,
          measure_type: itemJson.measureType,
          bust: itemJson.bust !== null ? new Prisma.Decimal(itemJson.bust) : null,
          waist: itemJson.waist !== null ? new Prisma.Decimal(itemJson.waist) : null,
          hip: itemJson.hip !== null ? new Prisma.Decimal(itemJson.hip) : null,
          shoulder: itemJson.shoulder !== null ? new Prisma.Decimal(itemJson.shoulder) : null,
          sleeve: itemJson.sleeve !== null ? new Prisma.Decimal(itemJson.sleeve) : null,
          height: itemJson.height !== null ? new Prisma.Decimal(itemJson.height) : null,
          back: itemJson.back !== null ? new Prisma.Decimal(itemJson.back) : null,
          real_return_date: itemJson.realReturnDate ?? null,
          real_return_buffer_days: itemJson.realReturnBufferDays ?? null,
          deleted: false,
          deleted_at: null,
          created_at: new Date(),
          updated_at: new Date(),
          products: itemJson.product ? {
            id: itemJson.productId,
            reference: itemJson.product.reference,
            description: itemJson.productDescription,
            price: new Prisma.Decimal(itemJson.productPrice),
            category_id: "",
            buffer_days: 0,
            receipt_description: "",
            deleted: false,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
            categories: itemJson.product.categories ? {
              id: "",
              name: itemJson.product.categories.name,
              measure_type: itemJson.measureType,
              buffer_days: 0,
              deleted: false,
              deleted_at: null,
              created_at: new Date(),
              updated_at: new Date(),
            } : null
          } : null
        };
      }),
      real_return_date: restOfInput.real_return_date !== undefined ? (restOfInput.real_return_date as Date | null) : currentDto.real_return_date
    } as unknown as RentType);

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
