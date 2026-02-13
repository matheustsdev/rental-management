import { NextRequest, NextResponse } from "next/server";
import { DefaultResponse } from "@/models/DefaultResponse";
import { ErrorResponse } from "@/models/ErrorResponse";
import { ServerError } from "@/models/ServerError";
import { rentalRepository } from "@/core/infrastructure/repositoriesFactory";
import { RentReturnDTO, RentReturnUseCase } from "@/core/application/cases/rent/RentReturnUseCase";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RentReturnDTO;

    const useCase = new RentReturnUseCase(rentalRepository);
    const result = await useCase.execute(body);

    const response = new DefaultResponse(result, "Aluguel finalizado com sucesso.", null, null, null);

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    if (error instanceof ServerError) {
      const errorResponse = new ErrorResponse(error);

      return NextResponse.json(errorResponse);
    }

    return NextResponse.json(
      {
        error: "Erro ao deletar aluguel",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}