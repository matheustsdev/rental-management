import { mock, MockProxy } from "jest-mock-extended";
import { UpdateCategoryUseCase } from "@/core/application/cases/category/UpdateCategoryUseCase";
import { ICategoryRepository } from "@/core/domain/repositories/ICategoryRepository";
import { getRandomCategory } from "../../../utils/factories";
import { ServerError } from "@/utils/models/ServerError";
import { measures_type } from "@prisma/client";

describe("Update category use case", () => {
  let categoryRepository: MockProxy<ICategoryRepository>;
  let useCase: UpdateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = mock<ICategoryRepository>();
    useCase = new UpdateCategoryUseCase(categoryRepository);
  });

  it("should update a category name and buffer successfully", async () => {
    const existingCategory = getRandomCategory();
    const input = {
      id: existingCategory.id,
      name: "Roupa Masculina",
      post_return_buffer_days: 3,
    };

    const expectedCategory = { ...existingCategory, ...input };
    categoryRepository.findById.mockResolvedValue(existingCategory);
    categoryRepository.findByName.mockResolvedValue(null);
    categoryRepository.update.mockResolvedValue(expectedCategory);

    const result = await useCase.execute(input);

    expect(result).toEqual(expectedCategory);
    expect(categoryRepository.findById).toHaveBeenCalledWith(input.id);
    expect(categoryRepository.update).toHaveBeenCalledWith(input.id, { name: input.name, post_return_buffer_days: input.post_return_buffer_days });
    /* Validates that a category can be updated with new name and buffer days */
  });

  it("should throw an error if the category does not exist", async () => {
    const input = {
      id: "non-existent-id",
      name: "Novo Nome",
    };

    categoryRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(input)).rejects.toThrow(
      new ServerError("Categoria não encontrada", 404)
    );
    expect(categoryRepository.update).not.toHaveBeenCalled();
    /* Validates that updating a non-existent category throws a 404 error */
  });

  it("should throw an error if updating to a name that already exists in another category", async () => {
    const existingCategory = getRandomCategory({ id: "category-1", name: "Original Name" });
    const anotherCategory = getRandomCategory({ id: "category-2", name: "Taken Name" });
    const input = {
      id: "category-1",
      name: "Taken Name",
    };

    categoryRepository.findById.mockResolvedValue(existingCategory);
    categoryRepository.findByName.mockResolvedValue(anotherCategory);

    await expect(useCase.execute(input)).rejects.toThrow(
      new ServerError("Já existe uma outra categoria com este nome", 400)
    );
    expect(categoryRepository.update).not.toHaveBeenCalled();
    /* Validates that name uniqueness is enforced and prevents conflict with other categories */
  });

  it("should allow updating to the same name (no change) successfully", async () => {
    const existingCategory = getRandomCategory({ id: "category-1", name: "Same Name" });
    const input = {
      id: "category-1",
      name: "Same Name",
      post_return_buffer_days: 5,
    };

    const expectedCategory = { ...existingCategory, ...input };
    categoryRepository.findById.mockResolvedValue(existingCategory);
    categoryRepository.findByName.mockResolvedValue(existingCategory);
    categoryRepository.update.mockResolvedValue(expectedCategory);

    const result = await useCase.execute(input);

    expect(result).toEqual(expectedCategory);
    expect(categoryRepository.update).toHaveBeenCalled();
    /* Validates that the name check doesn't prevent updating other fields with the same name */
  });
});
