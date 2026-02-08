import { IProductRepository, ProductListInput } from "@/core/domain/repositories/IProductRepository";
import { ProductType } from "@/types/entities/ProductType";
import { ListUseCaseReturnType } from "@/types/ListUseCaseReturnType";

export type ListProductUseCaseInputType = ProductListInput;

export class ListProductAvailabilityUseCase {
  constructor(
    private productRepository: IProductRepository,
  ) {}

  async execute(input: ListProductUseCaseInputType): Promise<ListUseCaseReturnType<ProductType>> {
    const count = await this.productRepository.count();
    const data = await this.productRepository.list(input);

    return { data, count };
  }
}
