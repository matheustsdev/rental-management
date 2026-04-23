import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { RentInsertWithProductDtoType, RentType } from "@/types/entities/RentType";
import { Rent } from "@/core/domain/entities/Rent";
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { ServerError } from "@/utils/models/ServerError";
import { v4 as uuidv4 } from "uuid";
import { ERentStatus } from "@prisma/client";
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

    const rent = new Rent({
      id: uuidv4(),
      status: ERentStatus.SCHEDULED,
      rentDate: startDate,
      returnDate: endDate,
      clientName: rest.client_name,
      address: rest.address ?? null,
      phone: rest.phone ?? null,
      discountType: discount_type ?? null,
      discountValue: Number(discount_value),
      signalValue: Number(signal_value),
      internalObservations: rest.internal_observations ?? null,
      receiptObservations: rest.receipt_observations ?? null,
      items: rentProducts,
    });

    const savedRent = await this.rentalRepo.create(rent);

    return RentMapper.toDto(savedRent);
  }
}
