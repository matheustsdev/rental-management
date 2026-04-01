import { CreateRentUseCase } from "@/core/application/cases/rent/CreateRentUseCase";
import { IRentalRepository } from "@/core/domain/repositories/IRentalRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { getRandomProduct, getRandomRent } from "../../../utils/factories";
import { RentInsertWithProductDtoType, RentType } from "@/types/entities/RentType";
import { startOfDay, addDays, subDays } from "date-fns";
import { Decimal } from "@prisma/client/runtime/library";
import { measures_type, EDiscountType, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Rental } from "@/core/domain/entities/Rental";
import { ServerError } from "@/utils/models/ServerError";

describe("Create rent use case", () => {
  let useCase: CreateRentUseCase;
  let rentalRepo: MockProxy<IRentalRepository>;
  let productRepo: MockProxy<IProductRepository>;

  beforeEach(() => {
    rentalRepo = mockDeep<IRentalRepository>();
    productRepo = mockDeep<IProductRepository>();
    useCase = new CreateRentUseCase(rentalRepo, productRepo);
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
      }
    ],
  };

  it("should create rent with valid data", async () => {
    const product = getRandomProduct({ id: validRentInput.rent_products[0].product_id, bufferDays: 1 });
    productRepo.findById.mockResolvedValue(product);
    rentalRepo.findActiveByProduct.mockResolvedValue([]);
    
    const expectedRent: RentType = getRandomRent({ 
        ...validRentInput, 
        total_value: new Decimal(50),
        remaining_value: new Decimal(50),
        rent_products: []
    } as Partial<RentType>);
    rentalRepo.create.mockResolvedValue(expectedRent);

    const result = await useCase.execute(validRentInput);

    // Valida se o aluguel retornado é o esperado
    expect(result).toEqual(expectedRent);
    // Valida se o método create do repositório foi chamado
    expect(rentalRepo.create).toHaveBeenCalled();
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
    
    rentalRepo.create.mockImplementation(async (data) => {
        return getRandomRent({ ...data as unknown as RentType, total_value: new Decimal(45) });
    });

    await useCase.execute(inputWithDiscount);

    // Valida se o valor total foi calculado corretamente com 10% de desconto (50 - 10% = 45)
    expect(rentalRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      total_value: new Decimal(45),
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
    
    rentalRepo.create.mockImplementation(async (data) => {
        return getRandomRent({ ...data as unknown as RentType, total_value: new Decimal(30) });
    });

    await useCase.execute(inputWithDiscount);

    // Valida se o valor total foi calculado corretamente com desconto fixo de 20 (50 - 20 = 30)
    expect(rentalRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      total_value: new Decimal(30),
    }));
  });

  it("should reject rent when product is not available", async () => {
    const productId = validRentInput.rent_products[0].product_id;
    const product = getRandomProduct({ id: productId, bufferDays: 1 });
    productRepo.findById.mockResolvedValue(product);
    
    const existingRental = new Rental(
      "rent-existing",
      productId,
      new Date(validRentInput.rent_date),
      new Date(validRentInput.return_date),
      'ACTIVE'
    );
    rentalRepo.findActiveByProduct.mockResolvedValue([existingRental]);

    // Valida se erro de indisponibilidade é lançado
    await expect(useCase.execute(validRentInput)).rejects.toThrow(ServerError);
    // Valida se a mensagem de erro contém o termo "indisponível"
    await expect(useCase.execute(validRentInput)).rejects.toThrow(/indisponível/);
  });

  it("should reject rent with invalid date range (return <= rent)", async () => {
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
    
    rentalRepo.create.mockImplementation(async (data: Prisma.rentsCreateInput) => {
        return getRandomRent({ 
            ...data as unknown as RentType, 
            signal_value: new Decimal(20), 
            remaining_value: new Decimal(30) 
        });
    });

    await useCase.execute(inputWithSignal);

    // Valida se o valor total e o valor restante foram salvos corretamente (Total 50, Sinal 20, Restante 30)
    expect(rentalRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      total_value: new Decimal(50),
      remaining_value: new Decimal(30),
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

    // Valida se a soma dos preços dos produtos resultou no valor total correto (50 + 75 = 125)
    expect(rentalRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      total_value: new Decimal(125),
    }));
  });
});
