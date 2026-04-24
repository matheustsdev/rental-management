import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentInsertWithProductDtoType, RentType } from "@/types/entities/RentType";
import { RentEntity } from "@/core/domain/entities/RentEntity";
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { ServerError } from "@/utils/models/ServerError";
import { v4 as uuidv4 } from "uuid";
import { ERentStatus, Prisma } from "@prisma/client";
import { RentMapper } from "../../mappers/RentMapper";

export class CreateRentUseCase {
  constructor(
    private rentalRepo: IRentalRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: RentInsertWithProductDtoType): Promise<RentType> {
    const { rent_products, rent_date, return_date, discount_type, discount_value = 0, signal_value = 0, ...rest } = input;

    const startDate = new Date(rent_date as string);
    const endDate = new Date(return_date as string);

    const rentProducts: RentProduct[] = [];

    for (const itemInput of rent_products) {
      const product = await this.productRepo.findById(itemInput.product_id);

      if (!product) {
        throw new ServerError(`Produto com ID ${itemInput.product_id} não encontrado.`, 404);
      }

      const activeRentals = await this.rentalRepo.findActiveByProduct(itemInput.product_id);
      
      const hasConflict = activeRentals.some(existingRent =>
        existingRent.conflictsWith(startDate, endDate, product.bufferDays)
      );

      if (hasConflict) {
        throw new ServerError(`Produto "${product.description}" indisponível entre as datas selecionadas (considerando período de limpeza).`);
      }

      rentProducts.push(new RentProduct({
        id: uuidv4(),
        productId: itemInput.product_id,
        productPrice: Number(itemInput.product_price),
        productDescription: itemInput.product_description,
        measureType: itemInput.measure_type,
        bust: itemInput.bust ? Number(itemInput.bust) : null,
        waist: itemInput.waist ? Number(itemInput.waist) : null,
        hip: itemInput.hip ? Number(itemInput.hip) : null,
        shoulder: itemInput.shoulder ? Number(itemInput.shoulder) : null,
        sleeve: itemInput.sleeve ? Number(itemInput.sleeve) : null,
        height: itemInput.height ? Number(itemInput.height) : null,
        back: itemInput.back ? Number(itemInput.back) : null,
        product: {
          reference: product.reference,
          categories: product.categoryName ? {
            name: product.categoryName
          } : null
        }
      }));
    }

    const rent = new RentEntity({
      id: uuidv4(),
      code: new Prisma.Decimal(0),
      status: ERentStatus.SCHEDULED,
      rent_date: startDate,
      return_date: endDate,
      client_name: rest.client_name,
      address: rest.address ?? null,
      phone: rest.phone ?? null,
      discount_type: discount_type ?? null,
      discount_value: discount_value,
      signal_value: signal_value,
      total_value: new Prisma.Decimal(0), // Will be calculated by entity if needed, or just placeholder
      remaining_value: new Prisma.Decimal(0),
      internal_observations: rest.internal_observations ?? null,
      receipt_observations: rest.receipt_observations ?? null,
      rent_products: rentProducts.map(item => {
        const itemJson = item.toJSON();
        return {
          id: itemJson.id,
          rent_id: "",
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
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
      deleted_at: null,
      real_return_date: null,
    } as unknown as RentType);

    const savedRent = await this.rentalRepo.create(rent);

    return RentMapper.toDto(savedRent);
  }
}
