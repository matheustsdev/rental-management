import { ICategoryRepository } from "@/core/domain/repositories/ICategoryRepository";
import { CreateCategoryDTO } from "@/core/application/dtos/CreateCategoryDTO";
import { CategoryType } from "@/types/entities/CategoryType";
import { ServerError } from "@/utils/models/ServerError";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: CreateCategoryDTO): Promise<CategoryType> {
    const existingCategory = await this.categoryRepository.findByName(input.name);

    if (existingCategory) {
      throw new ServerError("Já existe uma categoria com este nome", 400);
    }

    return this.categoryRepository.create(input);
  }
}
