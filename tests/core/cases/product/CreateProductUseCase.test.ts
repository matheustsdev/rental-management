import { CreateProductUseCase } from "@/core/application/cases/product/CreateProductUseCase";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { ProductInsertDtoType, ProductType } from "@/types/entities/ProductType";
import { Decimal } from "@prisma/client/runtime/library";
import { getRandomProductType } from "../../../utils/factories";

describe("Create product use case", () => {
  let useCase: CreateProductUseCase;
  let productRepo: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepo = mockDeep<IProductRepository>();
    useCase = new CreateProductUseCase(productRepo);
  });

  it("should create a product with valid fields", async () => {
    const input: ProductInsertDtoType = {
      reference: "SUIT-01",
      description: "Elegant Blue Suit",
      price: new Decimal(150),
    };

    // Fix: Cast input to any or omit incompatible Prisma nested fields before spreading
    // Since input only contains compatible primitives/Decimals, we can safely cast the override object
    const expectedProduct: ProductType = getRandomProductType({ 
      reference: input.reference,
      description: input.description as string,
      price: input.price as Decimal
    });
    productRepo.create.mockResolvedValue(expectedProduct);

    const result = await useCase.execute(input);

    expect(result).toEqual(expectedProduct);
    expect(productRepo.create).toHaveBeenCalledWith(input);
  });
});
