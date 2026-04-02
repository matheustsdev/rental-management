import { ICategoryRepository } from "@/core/domain/repositories/ICategoryRepository";
import { UpdateCategoryDTO } from "@/core/application/dtos/UpdateCategoryDTO";
import { CategoryType } from "@/types/entities/CategoryType";
import { ServerError } from "@/utils/models/ServerError";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: UpdateCategoryDTO): Promise<CategoryType> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new ServerError("Categoria não encontrada", 404);
    }

    if (input.name) {
      const existingCategory = await this.categoryRepository.findByName(input.name);
      
      if (existingCategory && existingCategory.id !== input.id) {
        throw new ServerError("Já existe uma outra categoria com este nome", 400);
      }
    }

    const { id, ...data } = input;
    return this.categoryRepository.update(id, data);
  }
}
