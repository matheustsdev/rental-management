import { z } from "zod";
import { EMeasureType } from "../EMeasureType";

export const ProductMeasuresSchema = z.object({
  id: z.string().optional(), // permite undefined
  rent_product_fk: z.string(),
  measure_type: z.enum(
    [EMeasureType.DRESS, EMeasureType.SUIT],
    { 
      errorMap: () => ({ message: "Tipo de medida inválido" })
    }
  ),
  waist: z
    .number({ invalid_type_error: "Informe um número válido" })
    .optional()
    .nullable(),
  bust: z
    .number({ invalid_type_error: "Informe um número válido" })
    .optional()
    .nullable(),
  hip: z
    .number({ invalid_type_error: "Informe um número válido" })
    .optional()
    .nullable(),
  shoulder: z
    .number({ invalid_type_error: "Informe um número válido" })
    .optional()
    .nullable(),
  sleeve: z
    .number({ invalid_type_error: "Informe um número válido" })
    .optional()
    .nullable(),
  height: z
    .number({ invalid_type_error: "Informe um número válido" })
    .optional()
    .nullable(),
  back: z
    .number({ invalid_type_error: "Informe um número válido" })
    .optional()
    .nullable(),
  created_at: z
    .string({ invalid_type_error: "created_at deve ser uma string" })
    .optional()
    .nullable(),
});