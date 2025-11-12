import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/prisma";
import { DefaultResponse } from "@/models/DefaultResponse";
import { ErrorResponse } from "@/models/ErrorResponse";
import { RentUpdateWithProductDtoType } from "@/types/entities/RentType";
import { ApiError } from "@/models/ApiError";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = (await request.json()) as RentUpdateWithProductDtoType;
    const id = (await params).id;

    if (!id) throw new ApiError("É obrigatório informar o ID do aluguel para atualiza-lo", 400);

    

    const updatedRent = await prisma.rents.update({
      data: body,
      where: {
        id: id.toString()
      },
      include: {
          rent_products: {
            include: {
              products: true
            }
          }
        }
    });

    const response = new DefaultResponse(updatedRent, "Aluguel atualizado com sucesso", null, null, null);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const apiError = error as ApiError;
    const errorResponse = new ErrorResponse(apiError.code ? apiError.message : "Erro ao atualizar aluguel", apiError.code ?? 500, apiError.message);

    return NextResponse.json(
      errorResponse,
      { status: errorResponse.errorCode }
    );
  }
}