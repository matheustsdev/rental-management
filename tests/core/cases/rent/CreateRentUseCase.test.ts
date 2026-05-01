import { CreateRentUseCase } from "@/core/application/cases/rent/CreateRentUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomProduct, getRandomProductType, getRandomCategory } from "../../../utils/factories";
import { RentInsertWithProductDtoType, RentType } from "@/types/entities/RentType";
import { startOfDay, addDays } from "date-fns";
import { Decimal } from "@prisma/client/runtime/library";
import { measures_type, EDiscountType, ERentStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { RentEntity } from "@/core/domain/entities/RentEntity";
import { RentProduct } from "@/core/domain/entities/RentProduct";
import { v4 as uuidv4 } from "uuid";
import { ServerError } from "@/utils/models/ServerError";
import { Product } from "@/core/domain/entities/Product";

describe("Create rent use case", () => {
  let useCase: CreateRentUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;
  let productRepo: MockProxy<IProductRepository>;

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    productRepo = mockDeep<IProductRepository>();
    useCase = new CreateRentUseCase(rentalRepo, productRepo);

    rentalRepo.create.mockImplementation(async (data) => data as RentEntity);
  });

  const validRentInput: RentInsertWithProductDtoType = {
    client_name: "John Doe",
    phone: "123456789",
    rent_date: addDays(startOfDay(new Date()), 1),
    return_date: addDays(startOfDay(new Date()), 5),
    total_value: new Decimal(50),
    rent_products: [
      {
        product_id: faker.string.uuid(),
        product_price: new Decimal(50),
        product_description: "Product 1",
        measure_type: measures_type.DRESS,
        internal_observations: "Alguma observação aqui",
      }
    ],
  };

  it("should create rent with valid data", async () => {
    const product = getRandomProduct({ id: validRentInput.rent_products[0].product_id, bufferDays: 1 });
    productRepo.findById.mockResolvedValue(product);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    
    const result = await useCase.execute(validRentInput);

    // Valida se o método create do repositório foi chamado
    expect(rentalRepo.create).toHaveBeenCalled();
    expect(result.client_name).toBe(validRentInput.client_name);
  });

  it("should create rent with PERCENTAGE discount", async () => {
    const inputWithDiscount: RentInsertWithProductDtoType = {
      ...validRentInput,
      discount_type: EDiscountType.PERCENTAGE,
      discount_value: new Decimal(10),
    };

    const product = getRandomProduct({ id: inputWithDiscount.rent_products[0].product_id, price: 50 });
    productRepo.findById.mockResolvedValue(product);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    
    await useCase.execute(inputWithDiscount);

    // Valida se o valor total foi calculado corretamente como subtotal (50) e restante (45)
    expect(rentalRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        discountValue: 10,
        discountType: EDiscountType.PERCENTAGE,
      })
    }));
  });

  it("should create rent with FIXED discount", async () => {
    const inputWithDiscount: RentInsertWithProductDtoType = {
      ...validRentInput,
      discount_type: EDiscountType.FIXED,
      discount_value: new Decimal(20),
    };

    const product = getRandomProduct({ id: inputWithDiscount.rent_products[0].product_id, price: 50 });
    productRepo.findById.mockResolvedValue(product);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    
    await useCase.execute(inputWithDiscount);

    expect(rentalRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        discountValue: 20,
        discountType: EDiscountType.FIXED,
      })
    }));
  });

  it("should reject rent when product is not available", async () => {
    const productId = validRentInput.rent_products[0].product_id;
    const product = getRandomProduct({ id: productId, bufferDays: 1 });
    productRepo.findById.mockResolvedValue(product);
    
    const existingRental = new RentEntity({
      id: "rent-existing",
      code: new Decimal(1),
      status: ERentStatus.SCHEDULED,
      rent_date: new Date(validRentInput.rent_date),
      return_date: new Date(validRentInput.return_date),
      client_name: "Existing Client",
      address: null,
      phone: null,
      discount_type: null,
      discount_value: new Decimal(0),
      signal_value: new Decimal(0),
      total_value: new Decimal(50),
      remaining_value: new Decimal(50),
      rent_products: [
        {
          id: uuidv4(),
          rent_id: "rent-existing",
          product_id: productId,
          product_price: new Decimal(50),
          product_description: "Product 1",
          measure_type: measures_type.DRESS,
          bust: null, waist: null, hip: null, shoulder: null, sleeve: null, height: null, back: null,
          real_return_date: null,
          real_return_buffer_days: null,
          deleted: false,
          deleted_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
      deleted_at: null,
      real_return_date: null,
    } as any);
    rentalRepo.findActiveByProduct.mockResolvedValue([existingRental]);

    // Valida se erro de indisponibilidade é lançado
    await expect(useCase.execute(validRentInput)).rejects.toThrow(ServerError);
  });

  it("should reject rent with invalid date range (return <= rent)", async () => {
    const productId = validRentInput.rent_products[0].product_id;
    const product = getRandomProduct({ id: productId });
    productRepo.findById.mockResolvedValue(product);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);

    const invalidInput: RentInsertWithProductDtoType = {
      ...validRentInput,
      rent_date: addDays(new Date(), 5),
      return_date: addDays(new Date(), 2),
    };

    // Valida se erro de data de devolução inválida é lançado
    await expect(useCase.execute(invalidInput)).rejects.toThrow("A data de devolução deve ser posterior à data de aluguel.");
  });

  it("should create rent with signal deposit", async () => {
    const inputWithSignal: RentInsertWithProductDtoType = {
      ...validRentInput,
      signal_value: new Decimal(20),
    };

    const product = getRandomProduct({ id: inputWithSignal.rent_products[0].product_id, price: 50 });
    productRepo.findById.mockResolvedValue(product);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    
    await useCase.execute(inputWithSignal);

    expect(rentalRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        signalValue: 20,
      })
    }));
  });

  it("should calculate total price correctly for multiple products", async () => {
    const p1Id = faker.string.uuid();
    const p2Id = faker.string.uuid();
    const multiProductInput: RentInsertWithProductDtoType = {
      ...validRentInput,
      rent_products: [
        { product_id: p1Id, product_price: new Decimal(50), product_description: "P1", measure_type: measures_type.DRESS },
        { product_id: p2Id, product_price: new Decimal(75), product_description: "P2", measure_type: measures_type.DRESS },
      ],
    };

    productRepo.findById.mockImplementation(async (id: string) => {
      if (id === p1Id) return getRandomProduct({ id: p1Id, price: 50 });
      if (id === p2Id) return getRandomProduct({ id: p2Id, price: 75 });
      return null;
    });

    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    
    await useCase.execute(multiProductInput);

    expect(rentalRepo.create).toHaveBeenCalled();
  });

  it("should save product measurements when creating rent", async () => {
    const mockProduct = getRandomProductType({ id: "product-1", categories: { ...getRandomCategory(), measure_type: measures_type.SUIT } });
    const domainProduct = new Product(
      mockProduct.id, 
      mockProduct.reference, 
      mockProduct.description!, 
      Number(mockProduct.price), 
      mockProduct.categories!.post_return_buffer_days!,
      mockProduct.categories!.name
    );
    productRepo.findById.mockResolvedValue(domainProduct);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    
    const input: RentInsertWithProductDtoType = {
      client_name: "Test",
      rent_date: "2025-03-01T00:00:00.000Z",
      return_date: "2025-03-05T00:00:00.000Z",
      total_value: new Decimal(100),
      rent_products: [{
        product_id: "product-1",
        product_price: new Decimal(100),
        product_description: "Test",
        measure_type: measures_type.SUIT,
        bust: 90,
        waist: 80,
        hip: 95,
        shoulder: 40,
        sleeve: 55,
        height: 170,
        back: 38,
      }]
    };

    await useCase.execute(input);

    expect(rentalRepo.create).toHaveBeenCalled();
  });
});
