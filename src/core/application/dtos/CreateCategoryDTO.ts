import { z } from "zod";
import { measures_type } from "@prisma/client";

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  post_return_buffer_days: z.number().int().min(0, "Dias de preparo deve ser um número positivo").default(0),
  measure_type: z.nativeEnum(measures_type).nullable().optional().default("NONE"),
});

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;
