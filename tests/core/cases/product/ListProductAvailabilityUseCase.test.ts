import { ListProductAvailabilityUseCase } from "@/core/application/cases/product/ListProductAvailabilityUseCase";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { mockDeep, MockProxy } from "jest-mock-extended";

describe("List product availability use case", () => {
  let useCase: ListProductAvailabilityUseCase;
  let productRepo: MockProxy<IProductRepository>;

  beforeEach(() => {
    productRepo = mockDeep<IProductRepository>();
    useCase = new ListProductAvailabilityUseCase(productRepo);
  });

  it("should show availability for date range", async () => {
    const startDate = new Date("2025-03-01");
    const endDate = new Date("2025-03-10");
    const searchText = "dress";

    productRepo.listWithAvailability.mockResolvedValue([]);
    productRepo.count.mockResolvedValue(0);

    const result = await useCase.execute(searchText, startDate, endDate);

    expect(result.data).toEqual([]);
    expect(productRepo.listWithAvailability).toHaveBeenCalledWith(searchText, startDate, endDate);
  });
});
