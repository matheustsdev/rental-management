import { z } from "zod";
import { measures_type } from "@prisma/client";

export const UpdateCategorySchema = z.object({
  id: z.string().uuid("ID inválido"),
  name: z.string().min(1, "Nome é obrigatório").optional(),
  post_return_buffer_days: z.number().int().min(0, "Dias de preparo deve ser um número positivo").optional(),
  measure_type: z.nativeEnum(measures_type).nullable().optional(),
});

export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;
