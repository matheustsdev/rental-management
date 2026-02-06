import { NextRequest, NextResponse } from "next/server";
import { RentInsertWithProductDtoType, RentUpdateWithProductDtoType, RentType } from "@/types/entities/RentType";
import { DefaultResponse } from "@/models/DefaultResponse";
import { ErrorResponse } from "@/models/ErrorResponse";
import { CreateRentUseCase } from "@/core/application/cases/rent/CreateRentUseCase";
import { productRepository, rentalRepository } from "@/core/infrastructure/repositoriesFactory";
import { ListRentUseCase } from "@/core/application/cases/rent/ListRentUseCase";
import { UpdateRentUseCase } from "@/core/application/cases/rent/UpdateRentUseCase";
import { ServerError } from "@/models/ServerError";

export async function GET(request: NextRequest) {
  try {

    const searchParams = request.nextUrl.searchParams;

    const where = searchParams.get("where") ? JSON.parse(searchParams.get("where")!) : undefined;

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof RentType | undefined;
    const ascending = searchParams.get("ascending") !== "false";

    const useCase = new ListRentUseCase(rentalRepository);
    const { data, count } = await useCase.execute({
      where,
      page,
      pageSize,
      orderBy,
      ascending
    });

    const response = new DefaultResponse(data, "Busca de alugueis concluída.", page, pageSize, count);

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao buscar alugueis",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as RentUpdateWithProductDtoType;

    const useCase = new UpdateRentUseCase(rentalRepository, productRepository);
    const updatedRent = await useCase.execute(body);

    const response = new DefaultResponse(updatedRent, "Aluguel atualizado com sucesso.", null, null, null);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ServerError) {
      const errorResponse = new ErrorResponse(error);

      return NextResponse.json(errorResponse);
    }

    return NextResponse.json(
      {
        error: "Erro ao atualizar aluguel",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RentInsertWithProductDtoType;

    const useCase = new CreateRentUseCase(rentalRepository, productRepository);

    const newRent = await useCase.execute(body);

    const response = new DefaultResponse(newRent, "Aluguel criado com sucesso", null, null, null);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof ServerError) {
      const errorResponse = new ErrorResponse(error);

      return NextResponse.json(errorResponse);
    }

    return NextResponse.json(
      {
        error: "Erro ao criar aluguel",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
