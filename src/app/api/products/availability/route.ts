import { NextRequest, NextResponse } from "next/server";
import { ListProductAvailabilityUseCase } from "@/core/application/cases/product/ListProductAvailabilityUseCase";
import { productRepository } from "@/core/infrastructure/repositoriesFactory";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const search = params.get("search"); 
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");

    if (!startDate || !endDate) throw new Error("Informe a data de aluguel e de retorno");

    const useCase = new ListProductAvailabilityUseCase(productRepository);
    const response = await useCase.execute(search ?? "", new Date(startDate), new Date(endDate));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao buscar produtos",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
