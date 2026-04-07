import { z } from "zod";

export const CreateProductSchema = z.object({
  reference: z.string().trim().min(2, "A referência deve possuir no mínimo 2 caracteres"),
  description: z.string().trim().min(2, "A descrição deve possuir no mínimo 2 caracteres"),
  receipt_description: z.string().trim().min(2, "A descrição do recibo deve possuir no mínimo 2 caracteres").optional().nullable(),
  category_id: z.string().uuid("ID de categoria inválido"),
  price: z.number({ invalid_type_error: "Preço inválido" }).positive("O preço deve ser maior que 0"),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;
