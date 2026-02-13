import { NextRequest, NextResponse } from "next/server";
import { DefaultResponse } from "@/utils/models/DefaultResponse";
import { ErrorResponse } from "@/utils/models/ErrorResponse";
import { ServerError } from "@/utils/models/ServerError";
import { DeleteRentUseCase } from "@/core/application/cases/rent/DeleteRentUseCase";
import { rentalRepository } from "@/core/infrastructure/repositoriesFactory";
import { FindRentUseCase } from "@/core/application/cases/rent/FindRentUseCase";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;

    if (!id) throw new ServerError("É obrigatório informar o ID do aluguel para deleta-lo", 400);
    
    const useCase = new DeleteRentUseCase(rentalRepository);
    await useCase.execute(id);
    
    const response = new DefaultResponse(null, "Aluguel deletado com sucesso", null, null, null);

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

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;

    if (!id) throw new ServerError("É obrigatório informar o ID do aluguel para busca-lo", 400);
    
    const useCase = new FindRentUseCase(rentalRepository);
    const rent = await useCase.execute(id);
    
    const response = new DefaultResponse(rent, "Aluguel encontrado com sucesso", null, null, null);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ServerError) {
      const errorResponse = new ErrorResponse(error);

      return NextResponse.json(errorResponse);
    }

    return NextResponse.json(
      {
        error: "Erro ao encontrar aluguel",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}