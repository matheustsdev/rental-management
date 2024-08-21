import { api } from ".";
import { CreateProductDTO, UpdateProductDTO } from "../../types/DTOs";
import { ProductType } from "../../types/entities/product";
import { BaseApi } from "./baseApi";

export const productApi = new BaseApi<ProductType, CreateProductDTO, UpdateProductDTO>(api, "/product/");