import { ListProductUseCase } from "@/core/application/cases/product/ListProductUseCase";
import { IProductRepository, ProductListInput } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { ProductType } from "@/types/entities/ProductType";
import { getRandomProductType } from "../../../utils/factories";

describe("List product use case", () => {
  let useCase: ListProductUseCase;
  let productRepo: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepo = mockDeep<IProductRepository>();
    useCase = new ListProductUseCase(productRepo);
  });

  it("should list products and return count", async () => {
    const products: ProductType[] = [getRandomProductType(), getRandomProductType()];
    productRepo.list.mockResolvedValue(products);
    productRepo.count.mockResolvedValue(2);

    const result = await useCase.execute({});

    expect(result.data).toEqual(products);
    expect(result.count).toBe(2);
    expect(productRepo.list).toHaveBeenCalledWith({});
    expect(productRepo.count).toHaveBeenCalledWith({});
  });

  it("should filter products by reference/search", async () => {
    const filters: ProductListInput = { search: "SUIT" };
    productRepo.list.mockResolvedValue([]);
    productRepo.count.mockResolvedValue(0);

    await useCase.execute(filters);

    expect(productRepo.list).toHaveBeenCalledWith(expect.objectContaining({ search: "SUIT" }));
    expect(productRepo.count).toHaveBeenCalledWith(expect.objectContaining({ search: "SUIT" }));
  });
});
