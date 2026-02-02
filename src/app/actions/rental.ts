"use server"

import { z } from "zod";
import { redirect } from "next/navigation";
import { CreateRentalUseCase } from "@/core/application/cases/CreateRentalUseCase";
import { PrismaRentalRepository } from "@/core/infrastructure/database/PrismaRentalRepository";
import { PrismaProductRepository } from "@/core/infrastructure/database/PrismaProductRepository";

const createRentalSchema = z.object({
  productId: z.string().uuid(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  clientName: z.string().min(3, "Nome do cliente é obrigatório"),
});

export type RentalState = {
  errors?: {
    productId?: string[];
    startDate?: string[];
    endDate?: string[];
    clientName?: string[];
  };
  message?: string | null;
};

export async function createRentalAction(prevState: RentalState, formData: FormData): Promise<RentalState> {
  const validatedFields = createRentalSchema.safeParse({
    productId: formData.get("productId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    clientName: formData.get("clientName"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro na validação dos campos.",
    };
  }

  const { productId, startDate, endDate, clientName } = validatedFields.data;

  const rentalRepo = new PrismaRentalRepository();
  const productRepo = new PrismaProductRepository();
  const useCase = new CreateRentalUseCase(rentalRepo, productRepo);

  try {
    await useCase.execute({ productId, startDate, endDate, clientName });
  } catch (error: any) {
    return { message: error.message || "Ocorreu um erro ao criar o aluguel." };
  }

  redirect("/dashboard");
}