import { ICategoryRepository } from "@/core/domain/repositories/ICategoryRepository";
import { CategoryType } from "@/types/entities/CategoryType";
import { ServerError } from "@/utils/models/ServerError";

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<CategoryType> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new ServerError("Categoria não encontrada", 404);
    }

    return this.categoryRepository.delete(id);
  }
}
