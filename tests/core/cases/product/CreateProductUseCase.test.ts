import { CreateProductUseCase } from "@/core/application/cases/product/CreateProductUseCase";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { ProductType } from "@/types/entities/ProductType";
import { Decimal } from "@prisma/client/runtime/library";
import { getRandomProductType } from "../../../utils/factories";
import { CreateProductDTO } from "@/core/application/dtos/CreateProductDTO";
import { faker } from "@faker-js/faker";

describe("Create product use case", () => {
  let useCase: CreateProductUseCase;
  let productRepo: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepo = mockDeep<IProductRepository>();
    useCase = new CreateProductUseCase(productRepo);
  });

  it("should create a product with valid fields", async () => {
    const categoryId = faker.string.uuid();
    const input: CreateProductDTO = {
      reference: "SUIT-01",
      description: "Elegant Blue Suit",
      category_id: categoryId,
      price: 150,
      receipt_description: "Elegant Blue Suit Receipt",
    };

    const expectedProduct: ProductType = getRandomProductType({ 
      reference: input.reference,
      description: input.description,
      price: new Decimal(input.price),
      category_id: input.category_id,
      receipt_description: input.receipt_description
    });
    
    productRepo.create.mockResolvedValue(expectedProduct);

    const result = await useCase.execute(input);

    expect(result).toEqual(expectedProduct);
    expect(productRepo.create).toHaveBeenCalledWith({
      reference: input.reference,
      description: input.description,
      receipt_description: input.receipt_description,
      price: input.price,
      categories: {
        connect: {
          id: input.category_id
        }
      }
    });
  });
});
