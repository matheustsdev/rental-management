import axios from "axios";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../../types/DTOs";
import { CategoryType } from "../../types/entities/category";
import { BaseApi } from "./baseApi";

export const api = axios.create({
    baseURL: "https://localhost:7024/api"
});


export const categoryApi = new BaseApi<CategoryType, CreateCategoryDTO, UpdateCategoryDTO>(api, "/category/");