import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { ProductInsertDtoType, ProductType } from "@/types/entities/ProductType";

export class CreateProductlUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(input: ProductInsertDtoType): Promise<ProductType> {
    const newProduct = await this.productRepository.create(input);

    return newProduct;
  }
}
