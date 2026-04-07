import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { ProductType } from "@/types/entities/ProductType";
import { CreateProductDTO, CreateProductSchema } from "../../dtos/CreateProductDTO";

export class CreateProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(input: CreateProductDTO): Promise<ProductType> {
    const validatedData = CreateProductSchema.parse(input);

    const newProduct = await this.productRepository.create({
      reference: validatedData.reference,
      description: validatedData.description,
      receipt_description: validatedData.receipt_description,
      price: validatedData.price,
      categories: {
        connect: {
          id: validatedData.category_id
        }
      }
    });

    return newProduct;
  }
}
