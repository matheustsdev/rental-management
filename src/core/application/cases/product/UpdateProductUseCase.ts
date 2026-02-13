import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { ServerError } from "@/utils/models/ServerError";
import { ProductType, ProductUpdateDtoType } from "@/types/entities/ProductType";

export class UpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(input: ProductUpdateDtoType): Promise<ProductType> {
    const { id } = input;

    if (!id || typeof id !== 'string') {
      throw new ServerError("É obrigatório informar o ID do produto para atualizar.", 400);
    }
    
    const updatedProduct = await this.productRepository.update(id, input);

    return updatedProduct;
  }
}
