import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/prisma";
import { DefaultResponse } from "@/utils/models/DefaultResponse";
import { ErrorResponse } from "@/utils/models/ErrorResponse";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const id = (await params).id;

    const updatedProduct = await prisma.products.update({
      data,
      where: {
        id: id
      }
    });

    const response = new DefaultResponse(updatedProduct, "Produto atualizado com sucesso.", null, null, null);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorResponse = new ErrorResponse("Erro ao atualizar produto.", 500, (error as Error).message);

    return NextResponse.json(
      errorResponse,
      { status: errorResponse.errorCode }
    );
  }
}
