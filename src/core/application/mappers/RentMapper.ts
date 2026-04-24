import { RentEntity } from "@/core/domain/entities/RentEntity";
import { RentType } from "@/types/entities/RentType";
import { Prisma, measures_type as PrismaMeasureType } from "@prisma/client";

/**
 * Tipo auxiliar para representar um item de aluguel (rent_product) com seus relacionamentos,
 * conforme definido no RentType (Prisma Payload).
 */
type RentProductWithProduct = Prisma.rent_productsGetPayload<{
  include: {
    products: {
      include: {
        categories: true;
      };
    };
  };
}>;

export class RentMapper {
  /**
   * Converte a entidade de domínio Rent para o DTO RentType esperado pela camada de apresentação.
   * Lida com a conversão de tipos (number para Decimal) e estruturas de dados de forma estrita (sem 'any').
   */
  public static toDto(rent: RentEntity): RentType {
    const json = rent.toJSON();
    
    // Mapeamento tipado dos produtos do aluguel
    const rent_products = json.items.map(item => {
      const itemJson = item.toJSON();
      return {
        id: itemJson.id,
        rent_id: json.id,
        product_id: itemJson.productId,
        product_price: new Prisma.Decimal(itemJson.productPrice),
        product_description: itemJson.productDescription,
        created_at: null,
        real_return_buffer_days: itemJson.realReturnBufferDays ?? null,
        real_return_date: itemJson.realReturnDate ?? null,
        bust: itemJson.bust !== null ? new Prisma.Decimal(itemJson.bust) : null,
        waist: itemJson.waist !== null ? new Prisma.Decimal(itemJson.waist) : null,
        hip: itemJson.hip !== null ? new Prisma.Decimal(itemJson.hip) : null,
        shoulder: itemJson.shoulder !== null ? new Prisma.Decimal(itemJson.shoulder) : null,
        sleeve: itemJson.sleeve !== null ? new Prisma.Decimal(itemJson.sleeve) : null,
        height: itemJson.height !== null ? new Prisma.Decimal(itemJson.height) : null,
        back: itemJson.back !== null ? new Prisma.Decimal(itemJson.back) : null,
        measure_type: itemJson.measureType as PrismaMeasureType,
        deleted: false,
        deleted_at: null,
        products: itemJson.product ? {
          reference: itemJson.product.reference,
          categories: itemJson.product.categories ? {
            name: itemJson.product.categories.name
          } : null
        } : null
      };
    }) as unknown as RentProductWithProduct[];

    // Construção tipada do objeto RentType
    const dto: RentType = {
      id: json.id,
      code: json.code !== undefined && json.code !== null ? new Prisma.Decimal(json.code) : new Prisma.Decimal(0),
      status: json.status,
      created_at: json.createdAt ?? null,
      rent_date: json.rentDate,
      return_date: json.returnDate,
      client_name: json.clientName,
      address: json.address,
      phone: json.phone,
      total_value: new Prisma.Decimal(rent.getTotalValue()),
      discount_type: json.discountType,
      discount_value: new Prisma.Decimal(json.discountValue),
      signal_value: new Prisma.Decimal(json.signalValue),
      remaining_value: new Prisma.Decimal(rent.getRemainingValue()),
      internal_observations: json.internalObservations ?? null,
      receipt_observations: json.receiptObservations ?? null,
      deleted: false,
      deleted_at: null,
      real_return_date: json.realReturnDate ?? null,
      remaining_balance: rent.getRemainingValue(),
      rent_products: rent_products,
      updated_at: null
    };

    return dto;
  }
}
