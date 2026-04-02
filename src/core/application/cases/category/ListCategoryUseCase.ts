import { ICategoryRepository, CategoryListInput } from "@/core/domain/repositories/ICategoryRepository";
import { CategoryType } from "@/types/entities/CategoryType";

export class ListCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(params?: CategoryListInput): Promise<{ data: CategoryType[]; count: number }> {
    const [data, count] = await Promise.all([
      this.categoryRepository.list(params),
      this.categoryRepository.count(params?.search ? { name: { contains: params.search, mode: 'insensitive' } } : undefined)
    ]);

    return { data, count };
  }
}
