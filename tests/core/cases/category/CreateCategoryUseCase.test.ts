import { mock, MockProxy } from "jest-mock-extended";
import { CreateCategoryUseCase } from "@/core/application/cases/category/CreateCategoryUseCase";
import { ICategoryRepository } from "@/core/domain/repositories/ICategoryRepository";
import { getRandomCategory } from "../../../utils/factories";
import { ServerError } from "@/utils/models/ServerError";
import { measures_type } from "@prisma/client";

describe("Create category use case", () => {
  let categoryRepository: MockProxy<ICategoryRepository>;
  let useCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = mock<ICategoryRepository>();
    useCase = new CreateCategoryUseCase(categoryRepository);
  });

  it("should create a new category successfully", async () => {
    const input = {
      name: "Sapatos",
      post_return_buffer_days: 0,
      measure_type: measures_type.NONE,
    };

    const expectedCategory = getRandomCategory(input);
    categoryRepository.findByName.mockResolvedValue(null);
    categoryRepository.create.mockResolvedValue(expectedCategory);

    const result = await useCase.execute(input);

    expect(result).toEqual(expectedCategory);
    expect(categoryRepository.findByName).toHaveBeenCalledWith(input.name);
    expect(categoryRepository.create).toHaveBeenCalledWith(input);
    /* Validates that the category is created when the name is unique */
  });

  it("should throw an error if the category name already exists", async () => {
    const input = {
      name: "Vestidos",
      post_return_buffer_days: 1,
      measure_type: measures_type.DRESS,
    };

    categoryRepository.findByName.mockResolvedValue(getRandomCategory({ name: input.name }));

    await expect(useCase.execute(input)).rejects.toThrow(
      new ServerError("Já existe uma categoria com este nome", 400)
    );
    expect(categoryRepository.create).not.toHaveBeenCalled();
    /* Validates that an error is thrown to prevent duplicate category names */
  });
});
