import { api } from ".";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../../types/DTOs";
import { CategoryType } from "../../types/entities/category";
import { BaseApi } from "./baseApi";

export const categoryApi = new BaseApi<CategoryType, CreateCategoryDTO, UpdateCategoryDTO>(api, "/category/");