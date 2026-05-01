import { z } from "zod";
import { EMeasureType } from "../EMeasureType";
import { decimalSchema } from "./DecimalSchema";
import { dateSchema } from "./DateSchema";

export const RentProductSchema = z.object({
  id: z.string().optional(),
  product_id: z.string(),
  product_description: z.string({
    invalid_type_error: "Descrição do produto é obrigatória",
  }),
  internal_observations: z.string().optional().nullable(),
  product_price: decimalSchema,
  actual_return_buffer_days: z
    .number({
      invalid_type_error:
        "Informe um número válido para os dias de preparo real",
    })
    .optional()
    .nullable(),
  actual_return_date: dateSchema
    .optional()
    .nullable(),
    waist: decimalSchema
    .optional()
    .nullable(),
  bust: decimalSchema
    .optional()
    .nullable(),
  hip: decimalSchema
    .optional()
    .nullable(),
  shoulder: decimalSchema
    .optional()
    .nullable(),
  sleeve: decimalSchema
    .optional()
    .nullable(),
  height: decimalSchema
    .optional()
    .nullable(),
  back: decimalSchema
    .optional()
    .nullable(),
  measure_type: z.enum(
    [EMeasureType.DRESS, EMeasureType.SUIT, EMeasureType.NONE],
    { 
      errorMap: () => ({ message: "Tipo de medida inválido" })
    }
  ),
  created_at: dateSchema
    .optional()
    .nullable(),
});