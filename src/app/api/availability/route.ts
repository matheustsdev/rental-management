import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rentalRepository } from "@/core/infrastructure/repositoriesFactory";
import { CheckProductAvailabilityUseCase } from "@/core/application/cases/product/CheckProductAvailabilityUseCase";
import { getUTCDateFromInput } from "@/utils/getUTCDateFromInput";
import { defaultApiErrorHandler } from "@/utils/defaultApiErrorHandler";
import { DefaultResponse } from "@/utils/models/DefaultResponse";

const availabilityQuerySchema = z.object({
  productId: z.string().uuid("ID do produto inválido"),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de início inválida",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de fim inválida",
  }),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "A data de fim deve ser igual ou posterior à data de início",
  path: ["endDate"],
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const validation = availabilityQuerySchema.safeParse(query);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { productId, startDate, endDate } = validation.data;
    
    // Normalize dates to UTC to avoid timezone issues during comparison
    const start = getUTCDateFromInput(startDate);
    const end = getUTCDateFromInput(endDate);

    const useCase = new CheckProductAvailabilityUseCase(rentalRepository);
    const result = await useCase.execute(productId, start, end);

    const response = new DefaultResponse(
      result,
      result.message ?? "Consulta de disponibilidade realizada com sucesso.",
      null,
      null,
      null
    );

    return NextResponse.json(response);
  } catch (error) {
    return defaultApiErrorHandler(error);
  }
}
