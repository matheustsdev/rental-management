import { UpdateProductUseCase } from "@/core/application/cases/product/UpdateProductUseCase";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { ProductUpdateDtoType, ProductType } from "@/types/entities/ProductType";
import { ServerError } from "@/utils/models/ServerError";
import { Decimal } from "@prisma/client/runtime/library";
import { getRandomProductType } from "../../../utils/factories";

describe("UpdateProductUseCase", () => {
  let useCase: UpdateProductUseCase;
  let productRepo: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepo = mockDeep<IProductRepository>();
    useCase = new UpdateProductUseCase(productRepo);
  });

  it("should update product price", async () => {
    const productId = "prod-123";
    const input: ProductUpdateDtoType = {
      id: productId,
      price: new Decimal(175),
    };

    const expectedProduct: ProductType = getRandomProductType({ id: productId, price: new Decimal(175) });
    productRepo.update.mockResolvedValue(expectedProduct);

    const result = await useCase.execute(input);

    expect(result.price.toNumber()).toBe(175);
    expect(productRepo.update).toHaveBeenCalledWith(productId, input);
  });

  it("should throw error if id is missing", async () => {
    const input: ProductUpdateDtoType = {
      price: new Decimal(200),
    };

    await expect(useCase.execute(input)).rejects.toThrow(ServerError);
  });
});
