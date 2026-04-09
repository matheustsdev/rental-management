import { faker } from "@faker-js/faker";
import { Product } from "@/core/domain/entities/Product";
import { Rental } from "@/core/domain/entities/Rental";
import { RentType } from "@/types/entities/RentType";
import { ProductType } from "@/types/entities/ProductType";
import { CategoryType } from "@/types/entities/CategoryType";
import { Decimal } from "@prisma/client/runtime/library";
import { ERentStatus, measures_type } from "@prisma/client";

export const getRandomProduct = (overrides?: Partial<Product>): Product => {
  return new Product(
    overrides?.id ?? faker.string.uuid(),
    overrides?.reference ?? faker.string.alphanumeric(10).toUpperCase(),
    overrides?.description ?? faker.lorem.sentence(),
    overrides?.price ?? Number(faker.commerce.price({ min: 10, max: 200 })),
    overrides?.bufferDays ?? faker.number.int({ min: 0, max: 2 })
  );
};

export const getRandomRent = (overrides?: Partial<RentType>): RentType => {
  const rentDate = overrides?.rent_date ? new Date(overrides.rent_date) : faker.date.future();
  const returnDate = overrides?.return_date ? new Date(overrides.return_date) : faker.date.soon({ days: 7, refDate: rentDate });

  return {
    id: overrides?.id ?? faker.string.uuid(),
    client_name: overrides?.client_name ?? faker.person.fullName(),
    phone: overrides?.phone ?? faker.phone.number(),
    rent_date: rentDate,
    return_date: returnDate,
    status: overrides?.status ?? ERentStatus.SCHEDULED,
    total_value: overrides?.total_value ?? new Decimal(faker.number.float({ min: 50, max: 500 })),
    discount_type: overrides?.discount_type ?? null,
    discount_value: overrides?.discount_value ?? new Decimal(0),
    signal_value: overrides?.signal_value ?? new Decimal(0),
    remaining_value: overrides?.remaining_value ?? new Decimal(0),
    deleted: overrides?.deleted ?? false,
    deleted_at: overrides?.deleted_at ?? null,
    created_at: overrides?.created_at ?? new Date(),
    updated_at: overrides?.updated_at ?? new Date(),
    address: overrides?.address ?? faker.location.streetAddress(),
    code: overrides?.code ?? new Decimal(faker.number.int({ min: 1, max: 1000 })),
    internal_observations: overrides?.internal_observations ?? faker.lorem.sentence(),
    receipt_observations: overrides?.receipt_observations ?? faker.lorem.sentence(),
    real_return_date: overrides?.real_return_date ?? null,
    rent_products: overrides?.rent_products ?? [],
    remaining_balance: overrides?.remaining_balance ?? Number(overrides?.remaining_value ?? 0),
  } as RentType;
};

export const getRandomProductType = (overrides?: Partial<ProductType>): ProductType => {
  return {
    id: overrides?.id ?? faker.string.uuid(),
    reference: overrides?.reference ?? faker.string.alphanumeric(10).toUpperCase(),
    description: overrides?.description ?? faker.lorem.sentence(),
    price: overrides?.price ?? new Decimal(faker.number.float({ min: 10, max: 200 })),
    receipt_description: overrides?.receipt_description ?? faker.lorem.sentence(),
    category_id: overrides?.category_id ?? faker.string.uuid(),
    deleted: overrides?.deleted ?? false,
    deleted_at: overrides?.deleted_at ?? null,
    created_at: overrides?.created_at ?? new Date(),
    updated_at: overrides?.updated_at ?? new Date(),
    categories: overrides?.categories ?? {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      post_return_buffer_days: 2,
      measure_type: measures_type.DRESS,
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
      deleted_at: null,
    },
  } as ProductType;
};

export const getRandomRentalEntity = (overrides?: Partial<Rental>): Rental => {
  const startDate = overrides?.startDate ?? faker.date.future();
  const endDate = overrides?.endDate ?? faker.date.soon({ days: 7, refDate: startDate });

  return new Rental(
    overrides?.id ?? faker.string.uuid(),
    overrides?.productId ?? faker.string.uuid(),
    startDate,
    endDate,
    overrides?.status ?? 'ACTIVE',
    overrides?.realReturnDate ?? null
  );
};

export const getRandomCategory = (overrides?: Partial<CategoryType>): CategoryType => {
  return {
    id: overrides?.id ?? faker.string.uuid(),
    name: overrides?.name ?? faker.commerce.department(),
    post_return_buffer_days: overrides?.post_return_buffer_days ?? faker.number.int({ min: 0, max: 7 }),
    measure_type: overrides?.measure_type ?? faker.helpers.arrayElement(Object.values(measures_type)),
    created_at: overrides?.created_at ?? new Date(),
    updated_at: overrides?.updated_at ?? new Date(),
    deleted: overrides?.deleted ?? false,
    deleted_at: overrides?.deleted_at ?? null,
  } as CategoryType;
};
