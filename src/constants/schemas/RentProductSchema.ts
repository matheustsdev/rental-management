import { z } from "zod";
import { ProductMeasuresSchema } from "./ProductMeasuresSchema";

export const RentProductSchema = z.object({
  id: z.string().optional(),
  rent_id: z.string(),
  product_id: z.string(),
  product_description: z.string({
    invalid_type_error: "Descrição do produto é obrigatória",
  }),
  product_price: z.number({
    invalid_type_error: "Informe um número válido para product_price",
  }),
  actual_return_buffer_days: z
    .number({
      invalid_type_error:
        "Informe um número válido para actual_return_buffer_days",
    })
    .optional()
    .nullable(),
  actual_return_date: z
    .string({
      invalid_type_error: "actual_return_date deve ser uma string",
    })
    .optional()
    .nullable(),
  created_at: z
    .string({ invalid_type_error: "created_at deve ser uma string" })
    .optional()
    .nullable(),
  product_measures: ProductMeasuresSchema,
});